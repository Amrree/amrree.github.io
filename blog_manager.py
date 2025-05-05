import os
import json
from datetime import datetime
import xml.etree.ElementTree as ET
from typing import Dict, List

# Configuration
BLOGS_FILE = "blogs.html"
RSS_FILE = "rss.xml"
POSTS_DIR = "posts"  # Directory to store individual post files

# Create posts directory if it doesn't exist
if not os.path.exists(POSTS_DIR):
    os.makedirs(POSTS_DIR)

def load_core_identity() -> Dict:
    """Load core identity information from JSON file."""
    with open("../1_Core_Identity/identity_files/core_identity.json", 'r') as f:
        return json.load(f)

def generate_post_id(title: str) -> str:
    """Generate a unique ID for a blog post."""
    # Remove special characters and spaces, make lowercase
    return title.lower().replace(' ', '-').replace('&', 'and')

def create_post_file(title: str, content: str, image_url: str, categories: List[str]) -> str:
    """Create a new post file and return its ID."""
    post_id = generate_post_id(title)
    post_data = {
        "title": title,
        "content": content,
        "image_url": image_url,
        "categories": categories,
        "created_at": datetime.now().isoformat()
    }
    
    with open(os.path.join(POSTS_DIR, f"{post_id}.json"), 'w') as f:
        json.dump(post_data, f, indent=2)
    
    return post_id

def update_blogs_html(posts: List[Dict]):
    """Update the blogs.html file with new posts."""
    with open(BLOGS_FILE, 'r') as f:
        content = f.read()
    
    # Find the posts list section
    start_idx = content.find('<section class="posts-list"')
    end_idx = content.find('</section>')
    
    # Create new posts list
    posts_list = '<section class="posts-list" aria-label="Latest blog posts">\n'
    
    for post in posts:
        post_id = generate_post_id(post['title'])
        posts_list += f'''      <article class="post-card" tabindex="0" id="{post_id}">
        <img alt="{post['title']}" class="post-image" height="200" src="{post['image_url']}" width="400"/>
        <h2 class="post-title">{post['title']}</h2>
        <p class="post-excerpt">{post['content'][:150]}...</p>
        <a href="#" class="read-more-btn" aria-label="Read more about {post['title']}">Read Details</a>
      </article>
'''
    
    posts_list += '    </section>\n'
    
    # Update the content
    new_content = content[:start_idx] + posts_list + content[end_idx:]
    
    # Update the post count
    post_count = len(posts)
    new_content = new_content.replace('ARTICLES', f'ARTICLES ({post_count})')
    
    with open(BLOGS_FILE, 'w') as f:
        f.write(new_content)

def update_rss_feed(posts: List[Dict]):
    """Update the RSS feed with new posts."""
    tree = ET.parse(RSS_FILE)
    root = tree.getroot()
    channel = root.find('channel')
    
    # Remove existing items
    for item in channel.findall('item'):
        channel.remove(item)
    
    # Add new items
    for post in posts:
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = post['title']
        ET.SubElement(item, 'link').text = f"https://amrree.github.io/blogs.html#{generate_post_id(post['title'])}"
        ET.SubElement(item, 'description').text = post['content']
        ET.SubElement(item, 'pubDate').text = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+01:00')
        ET.SubElement(item, 'guid').text = f"https://amrree.github.io/blogs.html#{generate_post_id(post['title'])}"
        
        for category in post['categories']:
            ET.SubElement(item, 'category').text = category
    
    # Update lastBuildDate
    last_build = channel.find('lastBuildDate')
    if last_build is None:
        last_build = ET.SubElement(channel, 'lastBuildDate')
    last_build.text = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+01:00')
    
    tree.write(RSS_FILE, encoding='utf-8', xml_declaration=True)

def add_blog_post(title: str, content: str, image_url: str, categories: List[str]):
    """Add a new blog post."""
    # Load existing posts
    posts = []
    for post_file in os.listdir(POSTS_DIR):
        if post_file.endswith('.json'):
            with open(os.path.join(POSTS_DIR, post_file), 'r') as f:
                posts.append(json.load(f))
    
    # Add new post
    post_id = create_post_file(title, content, image_url, categories)
    
    # Load all posts including the new one
    posts = []
    for post_file in os.listdir(POSTS_DIR):
        if post_file.endswith('.json'):
            with open(os.path.join(POSTS_DIR, post_file), 'r') as f:
                posts.append(json.load(f))
    
    # Sort posts by creation date (newest first)
    posts.sort(key=lambda x: x['created_at'], reverse=True)
    
    # Update blogs.html and RSS feed
    update_blogs_html(posts)
    update_rss_feed(posts)
    
    print(f"Successfully added blog post: {title}")
    print(f"Post ID: {post_id}")
    print(f"Total posts: {len(posts)}")

def main():
    """Main function to handle command line arguments."""
    import argparse
    parser = argparse.ArgumentParser(description='Blog Management System')
    parser.add_argument('action', choices=['add'], help='Action to perform')
    parser.add_argument('--title', required=True, help='Blog post title')
    parser.add_argument('--content', required=True, help='Blog post content')
    parser.add_argument('--image', required=True, help='Image URL')
    parser.add_argument('--categories', nargs='+', required=True, help='Categories (space-separated)')
    
    args = parser.parse_args()
    
    if args.action == 'add':
        add_blog_post(args.title, args.content, args.image, args.categories)

if __name__ == "__main__":
    main()
