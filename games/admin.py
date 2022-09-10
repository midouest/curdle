from django.contrib import admin

from games.models import Game, Guess, Word

# Register your models here.
admin.site.register(Word)
admin.site.register(Game)
admin.site.register(Guess)
