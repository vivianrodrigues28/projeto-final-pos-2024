# Generated by Django 5.1.4 on 2024-12-23 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personagem',
            name='acessorio',
        ),
        migrations.AddField(
            model_name='filme',
            name='acessorio',
            field=models.ManyToManyField(blank=True, related_name='filmes', to='api.acessorio'),
        ),
    ]
