from flask import Blueprint, jsonify, request
from models import PlanetFitnessMembers, GoldGymMembers, LifetimeFitnessMembers, OmnigymAccount, db

from werkzeug.security import generate_password_hash


gym_bp = Blueprint('gym', __name__)

@gym_bp.route('/api/gyms', methods=['GET'])
def get_gyms():
    """Return list of available gyms"""
    gyms = [
        {'value': 'Planet Fitness', 'label': 'Planet Fitness'},
        {'value': 'Gold Gym', 'label': 'Gold Gym'},
        {'value': 'Lifetime Fitness', 'label': 'Lifetime Fitness'}
    ]
    return jsonify(gyms)

@gym_bp.route('/api/validate-member', methods=['POST'])
def validate_member():
    """Validate gym membership"""
    data = request.get_json()
    gym_name = data.get('gym_name')
    member_id = data.get('member_id')

    if not gym_name or not member_id:
        return jsonify({'valid': False, 'message': 'Missing gym name or member ID'}), 400

    # Check membership based on gym
    if gym_name == 'Planet Fitness':
        member = PlanetFitnessMembers.query.filter_by(member_id=member_id).first()
    elif gym_name == 'Gold Gym':
        member = GoldGymMembers.query.filter_by(member_id=member_id).first()
    elif gym_name == 'Lifetime Fitness':
        member = LifetimeFitnessMembers.query.filter_by(member_id=member_id).first()
    else:
        return jsonify({'valid': False, 'message': 'Invalid gym name'}), 400

    if member:
        return jsonify({'valid': True, 'message': 'Membership validated'})
    else:
        return jsonify({'valid': False, 'message': 'Invalid membership'}), 404

@gym_bp.route('/api/register', methods=['POST'])
def register_user():
    """Register a new Omnigym user"""
    data = request.get_json()
    
    required_fields = ['email', 'password', 'gym_name', 'member_id', 
                      'first_name', 'last_name', 'phone_number']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    # Check if email already exists
    if OmnigymAccount.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
    
    try:
        new_user = OmnigymAccount(
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            gym_name=data['gym_name'],
            member_id=data['member_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone_number=data['phone_number']
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'user_id': new_user.user_id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Registration failed',
            'error': str(e)
        }), 500
