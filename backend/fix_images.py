from app import app, db
from models import MenuItem
from sqlalchemy import text

with app.app_context():
    print("🔎 Checking MenuItem images...")

    items = MenuItem.query.all()
    if not items:
        print("⚠️ No MenuItem records found in the database.")
    else:
        count = 0
        for item in items:
            if item.image and "127.0.0.1" in item.image:
                filename = item.image.split("/")[-1]
                new_url = f"https://online-food-order-o3j3.onrender.com/static/uploads/{filename}"
                print(f"✅ Updating item {item.id}: {item.image} → {new_url}")
                item.image = new_url
                count += 1

        if count > 0:
            db.session.commit()
            print(f"🎉 Updated {count} image URLs.")
        else:
            print("✅ No image URLs required updating.")

print("✅ Script finished.")