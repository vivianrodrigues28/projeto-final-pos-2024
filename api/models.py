from django.db import models

class Especialidade(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome da Especialidade")
    descricao = models.TextField(verbose_name="Descrição da Especialidade", blank=True)

    def __str__(self):
        return self.nome


class Medico(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Médico")
    crm = models.CharField(max_length=20, verbose_name="CRM")
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE, related_name="medicos", verbose_name="Especialidade")
    foto = models.ImageField(upload_to='medicos', blank=True, null=True, verbose_name="Foto do Médico")

    def __str__(self):
        return f"Dr(a). {self.nome} - {self.especialidade}"


class Paciente(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Paciente")
    data_nascimento = models.DateField(verbose_name="Data de Nascimento")
    endereco = models.TextField(verbose_name="Endereço")
    telefone = models.CharField(max_length=15, verbose_name="Telefone")
    foto = models.ImageField(upload_to='pacientes', blank=True, null=True, verbose_name="Foto do Paciente")

    def __str__(self):
        return self.nome


class Enfermaria(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome da Enfermaria")
    capacidade = models.IntegerField(verbose_name="Capacidade de Pacientes")
    descricao = models.TextField(verbose_name="Descrição", blank=True)

    def __str__(self):
        return self.nome


class Equipamento(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Equipamento")
    descricao = models.TextField(verbose_name="Descrição do Equipamento")
    foto = models.ImageField(upload_to='equipamentos', blank=True, null=True, verbose_name="Foto do Equipamento")
    enfermaria = models.ForeignKey(Enfermaria, on_delete=models.SET_NULL, null=True, blank=True, related_name="equipamentos", verbose_name="Enfermaria")

    def __str__(self):
        return self.nome


class Prontuario(models.Model):
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name="prontuario", verbose_name="Paciente")
    medico = models.ForeignKey(Medico, on_delete=models.SET_NULL, null=True, related_name="prontuarios", verbose_name="Médico Responsável")
    data_atendimento = models.DateTimeField(auto_now_add=True, verbose_name="Data do Atendimento")
    descricao = models.TextField(verbose_name="Descrição do Atendimento")

    def __str__(self):
        return f"Prontuário de {self.paciente.nome} - {self.data_atendimento.strftime('%d/%m/%Y')}"
