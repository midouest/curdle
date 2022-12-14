# Generated by Django 4.1.1 on 2022-09-06 10:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Word",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("content", models.CharField(max_length=5, unique=True)),
                ("answer", models.BooleanField()),
            ],
            options={
                "ordering": ["created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Guess",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="games.game"
                    ),
                ),
                (
                    "word",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="guess_game_set",
                        to="games.word",
                    ),
                ),
            ],
            options={
                "ordering": ["created_at"],
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="game",
            name="answer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="answer_game_set",
                to="games.word",
            ),
        ),
        migrations.AddField(
            model_name="game",
            name="guesses",
            field=models.ManyToManyField(through="games.Guess", to="games.word"),
        ),
    ]
