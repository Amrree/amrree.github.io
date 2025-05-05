#!/bin/bash

# Check if required arguments are provided
if [ $# -lt 4 ]; then
    echo "Usage: $0 <title> <content> <image_url> <categories>"
    echo "Example: $0 'New Post Title' 'Post content here' 'https://image-url.jpg' 'Category1 Category2'"
    exit 1
fi

# Run the Python script
python blog_manager.py add \
    --title "$1" \
    --content "$2" \
    --image "$3" \
    --categories "$4"

# Check if the script was successful
if [ $? -eq 0 ]; then
    echo "Blog post added successfully!"
else
    echo "Failed to add blog post."
    exit 1
fi
