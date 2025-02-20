from app import app
from models import db, PlanetFitnessMembers, GoldGymMembers, LifetimeFitnessMembers, OmnigymAccount
from werkzeug.security import generate_password_hash

def initialize_db():
    with app.app_context():
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()
        print("Database initialized successfully!")

def create_test_data():
    with app.app_context():
        # Clear existing data
        db.session.query(PlanetFitnessMembers).delete()
        db.session.query(GoldGymMembers).delete()
        db.session.query(LifetimeFitnessMembers).delete()
        db.session.query(OmnigymAccount).delete()
        db.session.commit()

        # Create Planet Fitness members
        pf_members = [
            PlanetFitnessMembers(
                member_id="PF12345",
                first_name="John",
                last_name="Doe",
                active_status=True
            ),
            PlanetFitnessMembers(
                member_id="PF67890",
                first_name="Jane",
                last_name="Smith",
                active_status=True
            )
        ]

        # Create Gold Gym members
        gg_members = [
            GoldGymMembers(
                member_id="GG12345",
                first_name="Mike",
                last_name="Johnson",
                active_status=True
            ),
            GoldGymMembers(
                member_id="GG67890",
                first_name="Sarah",
                last_name="Williams",
                active_status=True
            )
        ]

        # Create Lifetime Fitness members
        lf_members = [
            LifetimeFitnessMembers(
                member_id="LF12345",
                first_name="Chris",
                last_name="Brown",
                active_status=True
            ),
            LifetimeFitnessMembers(
                member_id="LF67890",
                first_name="Emily",
                last_name="Davis",
                active_status=True
            )
        ]

        # Create Omnigym accounts
        omnigym_accounts = [
            OmnigymAccount(
                user_id="user1",
                email="john@example.com",
                password_hash=generate_password_hash("Password123$"),
                gym_name="Planet Fitness",
                member_id="PF12345",
                first_name="John",
                last_name="Doe",
                phone_number="123-456-7890",
                profile_picture_url="https://example.com/john.jpg",
                bio="Fitness enthusiast"
            ),
            OmnigymAccount(
                user_id="user2",
                email="jane@example.com",
                password_hash=generate_password_hash("password456"),
                gym_name="Planet Fitness",
                member_id="PF67890",
                first_name="Jane",
                last_name="Smith",
                phone_number="987-654-3210",
                profile_picture_url="https://example.com/jane.jpg",
                bio="Yoga lover"
            )
        ]

        # Add all members to session and commit
        db.session.add_all(pf_members)
        db.session.add_all(gg_members)
        db.session.add_all(lf_members)
        db.session.add_all(omnigym_accounts)
        db.session.commit()

        print("Test data created successfully!")

if __name__ == '__main__':
    initialize_db()
    create_test_data()
