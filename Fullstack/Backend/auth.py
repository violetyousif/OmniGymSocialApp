from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, OmnigymAccount, PlanetFitnessMembers, GoldGymMembers, LifetimeFitnessMembers
from datetime import datetime, timedelta
import jwt
import uuid
from functools import wraps

auth_bp = Blueprint('auth', __name__)

# Configuration
SECRET_KEY = 'your-secret-key'
TOKEN_EXPIRATION = timedelta(hours=1)

def validate_membership(gym_name, member_id):
    if gym_name == "Planet Fitness":
        member = PlanetFitnessMembers.query.get(member_id)
    elif gym_name == "Gold Gym":
        member = GoldGymMembers.query.get(member_id)
    elif gym_name == "Lifetime Fitness":
        member = LifetimeFitnessMembers.query.get(member_id)
    else:
        return False
        
    if member and member.active_status:
        return True
    return False

@auth_bp.route('/api/validate-member', methods=['POST'])
def validate_member():
    data = request.json
    gym_name = data.get('gym_name')
    member_id = data.get('member_id')
    
    if not gym_name or not member_id:
        return jsonify({"error": "Missing required fields"}), 400
        
    is_valid = validate_membership(gym_name, member_id)
    
    return jsonify({
        "valid": is_valid,
        "gym_name": gym_name,
        "member_id": member_id
    })

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    gym_name = data.get('gym_name')
    member_id = data.get('member_id')
    
    # Validate input
    if not all([email, password, gym_name, member_id]):
        return jsonify({"error": "Missing required fields"}), 400
        
    # Check if email exists
    if OmnigymAccount.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
        
    # Validate gym membership
    if not validate_membership(gym_name, member_id):
        return jsonify({"error": "Invalid gym membership"}), 400
        
    # Create account
    user_id = str(uuid.uuid4())
    new_account = OmnigymAccount(
        user_id=user_id,
        email=email,
        password_hash=generate_password_hash(password),
        gym_name=gym_name,
        member_id=member_id
    )
    
    db.session.add(new_account)
    db.session.commit()
    
    return jsonify({
        "message": "Account created successfully",
        "user_id": user_id
    }), 201

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
            
        try:
            data = jwt.decode(token.split()[1], SECRET_KEY, algorithms=['HS256'])
            current_user = OmnigymAccount.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token is invalid'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/api/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return jsonify({
        'user_id': current_user.user_id,
        'email': current_user.email,
        'first_name': current_user.first_name,
        'last_name': current_user.last_name,
        'phone_number': current_user.phone_number,
        'profile_picture_url': current_user.profile_picture_url,
        'bio': current_user.bio,
        'gym_name': current_user.gym_name,
        'member_id': current_user.member_id
    })

@auth_bp.route('/api/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    data = request.json
    if 'first_name' in data:
        current_user.first_name = data['first_name']
    if 'last_name' in data:
        current_user.last_name = data['last_name']
    if 'phone_number' in data:
        current_user.phone_number = data['phone_number']
    if 'profile_picture_url' in data:
        current_user.profile_picture_url = data['profile_picture_url']
    if 'bio' in data:
        current_user.bio = data['bio']
        
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'})

@auth_bp.route('/api/profile/password', methods=['PATCH'])
@token_required
def change_password(current_user):
    data = request.json
    if not check_password_hash(current_user.password_hash, data['old_password']):
        return jsonify({'error': 'Current password is incorrect'}), 400
        
    current_user.password_hash = generate_password_hash(data['new_password'])
    db.session.commit()
    return jsonify({'message': 'Password changed successfully'})

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
        
    # Find user
    user = OmnigymAccount.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401
        
    # Generate JWT token
    token = jwt.encode({
        'user_id': user.user_id,
        'exp': datetime.utcnow() + TOKEN_EXPIRATION
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        "token": token,
        "user_id": user.user_id,
        "expires_in": TOKEN_EXPIRATION.total_seconds()
    })
