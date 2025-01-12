# Generated by Django 5.1.4 on 2025-01-12 20:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_musica_url_alter_musica_duracao_alter_musica_filme'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enfermaria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome da Enfermaria')),
                ('capacidade', models.IntegerField(verbose_name='Capacidade de Pacientes')),
                ('descricao', models.TextField(blank=True, verbose_name='Descrição')),
            ],
        ),
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome da Especialidade')),
                ('descricao', models.TextField(blank=True, verbose_name='Descrição da Especialidade')),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome do Paciente')),
                ('data_nascimento', models.DateField(verbose_name='Data de Nascimento')),
                ('endereco', models.TextField(verbose_name='Endereço')),
                ('telefone', models.CharField(max_length=15, verbose_name='Telefone')),
                ('foto', models.ImageField(blank=True, null=True, upload_to='pacientes', verbose_name='Foto do Paciente')),
            ],
        ),
        migrations.RemoveField(
            model_name='filme',
            name='acessorio',
        ),
        migrations.RemoveField(
            model_name='filme',
            name='cenarios',
        ),
        migrations.RemoveField(
            model_name='filme',
            name='personagens',
        ),
        migrations.RemoveField(
            model_name='musica',
            name='filme',
        ),
        migrations.RemoveField(
            model_name='roupa',
            name='personagem',
        ),
        migrations.CreateModel(
            name='Equipamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome do Equipamento')),
                ('descricao', models.TextField(verbose_name='Descrição do Equipamento')),
                ('foto', models.ImageField(blank=True, null=True, upload_to='equipamentos', verbose_name='Foto do Equipamento')),
                ('enfermaria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='equipamentos', to='api.enfermaria', verbose_name='Enfermaria')),
            ],
        ),
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome do Médico')),
                ('crm', models.CharField(max_length=20, verbose_name='CRM')),
                ('foto', models.ImageField(blank=True, null=True, upload_to='medicos', verbose_name='Foto do Médico')),
                ('especialidade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medicos', to='api.especialidade', verbose_name='Especialidade')),
            ],
        ),
        migrations.CreateModel(
            name='Prontuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_atendimento', models.DateTimeField(auto_now_add=True, verbose_name='Data do Atendimento')),
                ('descricao', models.TextField(verbose_name='Descrição do Atendimento')),
                ('medico', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='prontuarios', to='api.medico', verbose_name='Médico Responsável')),
                ('paciente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='prontuario', to='api.paciente', verbose_name='Paciente')),
            ],
        ),
        migrations.DeleteModel(
            name='Acessorio',
        ),
        migrations.DeleteModel(
            name='Cenario',
        ),
        migrations.DeleteModel(
            name='Filme',
        ),
        migrations.DeleteModel(
            name='Musica',
        ),
        migrations.DeleteModel(
            name='Personagem',
        ),
        migrations.DeleteModel(
            name='Roupa',
        ),
    ]
