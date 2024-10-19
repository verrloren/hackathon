import sys
import json

def main():
    # Check if there are command-line arguments
    if len(sys.argv) > 1:
        # Assume the first argument is a name (can be any input if passed from Node.js)
        name = sys.argv[1]
        message = {"message": f"Hello, {name}!"}
    else:
        # Default output if no argument is passed
        message = {"message": "Hello, World!"}
    
    # Print the message as a JSON string (to be captured by stdout in Node.js)
    print(json.dumps(message))

# Entry point for the script
if __name__ == "__main__":
    main()