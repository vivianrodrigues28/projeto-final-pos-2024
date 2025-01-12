# Generated by Django 5.1.4 on 2024-12-28 12:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_personagem_acessorio_filme_acessorio'),
    ]

    operations = [
        migrations.AddField(
            model_name='musica',
            name='url',
            field=models.URLField(null=True, verbose_name='Link da música'),
        ),
        migrations.AlterField(
            model_name='musica',
            name='duracao',
            field=models.CharField(help_text='Nesse formato: 3m30', max_length=45, verbose_name='Duração da música'),
        ),
        migrations.AlterField(
            model_name='musica',
            name='filme',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='musicas', to='api.filme', verbose_name='Filme'),
        ),
    ]
