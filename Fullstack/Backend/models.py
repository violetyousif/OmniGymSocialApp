from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class PlanetFitnessMembers(db.Model):
    __tablename__ = 'planet_fitness_members'
    member_id = db.Column(db.String(50), primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    active_status = db.Column(db.Boolean)

class GoldGymMembers(db.Model):
    __tablename__ = 'gold_gym_members' 
    member_id = db.Column(db.String(50), primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    active_status = db.Column(db.Boolean)

class LifetimeFitnessMembers(db.Model):
    __tablename__ = 'lifetime_fitness_members'
    member_id = db.Column(db.String(50), primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    active_status = db.Column(db.Boolean)

class OmnigymAccount(db.Model):
    __tablename__ = 'omnigym_accounts'
    user_id = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    gym_name = db.Column(db.String(50), nullable=False)
    member_id = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    profile_picture_url = db.Column(db.String(200), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
