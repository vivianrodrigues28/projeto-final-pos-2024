from rest_framework import serializers
from .models import *

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(read_only=True)
    
    class Meta:
        model = Medico
        fields = '__all__'


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class EnfermariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enfermaria
        fields = '__all__'


class EquipamentoSerializer(serializers.ModelSerializer):
    enfermaria = EnfermariaSerializer(read_only=True)
    
    class Meta:
        model = Equipamento
        fields = '__all__'


class ProntuarioSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    medico = MedicoSerializer(read_only=True)

    class Meta:
        model = Prontuario
        fields = '__all__'

    def getPaciente(self, instance):
        paciente = super().getPaciente(instance)
        prontuario_pk = self.context.get('prontuario_pk')

        if prontuario_pk is not None and instance.prontuario_id != int(prontuario_pk):
            return {}
        
        return paciente

    def getMedico(self, instance):
        medico = super().getMedico(instance)
        prontuario_pk = self.context.get('prontuario_pk')

        if prontuario_pk is not None and instance.prontuario_id != int(prontuario_pk):
            return {}
        
        return medico
