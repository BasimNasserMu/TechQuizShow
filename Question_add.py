import json

def append_question_to_json(file_path, new_question):
    # Read existing data
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        # If the file does not exist, initialize an empty list
        data = []
    except json.JSONDecodeError:
        # Handle JSON decoding errors (if the file is corrupted)
        print("Error reading JSON data. The file might be corrupted.")
        return

    # Append new question
    data.append(new_question)
    
    # Write updated data back to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def get_user_input():
    # Get question details from user
    id = input("Enter the question ID ('done' to exit): ")
    if(id == "done"):
        return 0
    question = input("Enter the question text: ")
    
    answers = []
    while len(answers) < 4:
        answer = input(f"Enter answer choice {len(answers) + 1}: ")
        if answer:
            answers.append(answer)
        
    
    # Ensure there are exactly 4 choices
    while len(answers) < 4:
        answers.append(input(f"Enter additional choice {len(answers) + 1}: "))

    correct_answer = input("Enter the correct answer: ")
    
    # Create new question dictionary
    new_question = {
        "id": id,
        "question": question,
        "answers": answers,
        "correctAnswer": correct_answer
    }
    
    return new_question
new_question = 1
# Path to your JSON file
file_path = 'questions.json'
while(new_question):
    # Get user input and create a new question
    new_question = get_user_input()
    # Append the new question to the JSON file
    if(new_question):
        append_question_to_json(file_path, new_question)
        print("Question has been added Successfully\n")
