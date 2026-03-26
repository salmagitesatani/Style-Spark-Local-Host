
import os
import sys

from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image


script_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(script_dir, "api.env")
load_dotenv(env_path)

api_key = os.getenv("GENAI_API_KEY")


client = genai.Client(api_key=api_key)


style_definitions = {
    "Boho": "A style that is distinctive and free-spirited fashion trend that draws inspiration from bohemian and hippie influences. Common Items: Flowy Dresses, Bell Sleeves, Fringe, Embroidery, Layered Accessories, Ankle Boots.",
    "Goth": "A style known for its dark and edgy aesthetic, all-black attire and a fascination with elements of the dark and mysterious. Common Items: Leather, Fishnet Stockings, Spikes and Studs, Platform Boots, Victorian and Romantic Elements.",
    "Chic": "A style that emphasizes refined elegance, classic simplicity, and a certain 'effortlessly put-together' quality. Common Items: Tailored Clothing, Pencil Skirt, Trench Coat, High Quality Fabric, Heels, Classic Accessories.",
    "Indie": "A style that is a rejection of mainstream fashion norms in favor of a unique and independent aesthetic, that celebrates individualism and self-expression. Common Items: Vintage, Thrifted Pieces, Layered Outfits, Quirky Accessories, Denim.",
    "Coquette": "A style that is a playful and flirtatious fashion approach that celebrates femininity and allure. Common Items: Dresses, High Heels, Flirty Blouses (Ruffles, Lace, Bows), Skirts, Floral Patterns, Vintage Clothes",
    "Acubi": "A style that originated from China. The fashion combined the aesthetics of Cyber Fairy Grunge, Minimalism, and Subversive Basics. Common Items: Baggy Pieces, Baby Tees, Mesh and Sheer clothes, Layering pieces, Skirts, Cargo Pants, Platform Boots.",
    "Streetwear": "A style that has its origins in urban culture and is known for its casual, comfortable, and often edgy look. Common Items: Graphic T-Shirts, Baggy Pants, Cargo Pants, Sneakers, Distressed Denim.",
    "Y2k": "A distinctive style that reflects the fashion trends and aesthetics of the early 2000s, which was influenced by pop culture, technology, and futuristic ideas. Common Items: Low Rise Pants and Skirts, Crop Tops, Mini Skirts, Platform Shoes, Logos, Sheer Fabrics, Tracksuits, Sunglasses.",
    "Preppy": "A style that is a classic and timeless fashion and is characterized by a clean, polished, and traditionally well-groomed appearance. Common Items: Polo Shirts, Button-Down Shirts, Cable-Knit Sweaters, Blazers, Pearls, Tote Bags.",
    "Vintage": "A style that celebrates clothing and accessories from previous eras. It involves wearing authentic vintage pieces. Vintage style is known for its timeless and nostalgic appeal. Common Items: Retro Dresses, High-Waisted Bottoms, Retro Footwear, Thrifted Pieces.",
    "Business Casual": "Strikes a balance between formal business attire and casual wear. Business casual attire is characterized by its polished yet less formal appearance. Common Items: Collared Shirts, Blazers, Pencil Skirts, Slacks, Cardigans, Accessories.",
    "Minimalist": "A style that is a clean, simple, and uncluttered approach to dressing. It emphasizes simplicity, functionality, and a reduction of excess. Common Items: Simple, Clean Line Clothing, No Pattern clothes, Monochromatic, Subtle Accessories.",
    "Formal": "A style that utilizes the most elegant, refined, and polished style of clothing. Common Items: Suits (Men), Tuxedos (Men), Dress Shirts (Men), Long Dresses (Women), Heels, Dress Shoes, Clutches, Jewelry.",
    "Old Money": "A style that is a classic and timeless approach to fashion and lifestyle often associated with established and wealthy families who have inherited their wealth and social status over generations. Common Items: Collared Shirts, Conservative Dresses, Pearls, Equestrian style, Trench Coat, Herringbone Patterns.",
    "Camp": "A style that is flamboyant and exaggerated approach to dressing that celebrates extravagance, irony, humor, and theatricality. Common Items: Sequins and Glitter, Animal Print, Unconventional Accessories, Thrifted Pieces, Heels.",
    "Modest": "A style that emphasizes a reserved and understated appearance, often covering the body more conservatively. Common Items: Long Hemlines, High Necklines, Long Sleeves, Loose-Fit, Layering."
}

style = sys.argv[1] if len(sys.argv) > 1 else ""
results = sys.argv[2] if len(sys.argv) > 2 else ""
accessories = sys.argv[3] if len(sys.argv) > 3 else ""


example_photo = Image.open('/Users/salmagitesatani/Desktop/example.jpg')
text_input = f"Using the provided image, change the outfit into an outfit in the style of {style}, and it is in the best colors of a person with {results}. They are also wearing accessories in the metal color of {accessories}"


print(text_input)

response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=[example_photo, text_input],
)

output_filename = "../example_edited.png"
for part in response.parts:
    if part.inline_data is not None:
        image = part.as_image()
        image.save(output_filename)
        # This line is CRITICAL for your Java code to work
        print(f"Image saved as {output_filename}")
