from flask.cli import AppGroup
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .answer_comment import seed_answer_comments, undo_answer_comments
from .tags import seed_tags, undo_tags
from .question_comments import seed_question_comments, undo_question_comments
from .question_following import seed_question_followings, undo_question_followings
from .answer_upvote import seed_answer_upvotes, undo_answer_upvotes


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_questions()
        undo_answers()
        undo_answer_comments()
        undo_tags()
        undo_question_comments()
        undo_question_followings()
        undo_answer_upvotes()
    seed_users()
    seed_questions()
    seed_answers()
    seed_answer_comments()
    seed_tags()
    seed_question_comments()
    seed_question_followings()
    seed_answer_upvotes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_questions()
    undo_answers()
    undo_answer_comments()
    undo_tags()
    undo_question_comments()
    undo_question_followings()
    undo_answer_upvotes()
    # Add other undo functions here
