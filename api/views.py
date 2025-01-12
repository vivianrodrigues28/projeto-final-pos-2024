from rest_framework import viewsets
from .models import *
from .serializers import *

class EspecialidadeViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Especialidades.
    """
    queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer


class MedicoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Médicos.
    """
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    def get_queryset(self):
        especialidade_pk = self.kwargs.get('especialidade_pk')
        if especialidade_pk:
            return Medico.objects.filter(especialidade_id=especialidade_pk)
        return Medico.objects.all()


class PacienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Pacientes.
    """
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    def get_queryset(self):
        paciente_pk = self.kwargs.get('paciente_pk')
        if paciente_pk:
            return Paciente.objects.filter(id=paciente_pk)
        return Paciente.objects.all()


class EnfermariaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Enfermarias.
    """
    queryset = Enfermaria.objects.all()
    serializer_class = EnfermariaSerializer


class EquipamentoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Equipamentos.
    """
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer

    def get_queryset(self):
        enfermaria_pk = self.kwargs.get('enfermaria_pk')
        if enfermaria_pk:
            return Equipamento.objects.filter(enfermaria_id=enfermaria_pk)
        return Equipamento.objects.all()


class ProntuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Prontuários.
    """
    queryset = Prontuario.objects.all()
    serializer_class = ProntuarioSerializer

    def get_queryset(self):
        paciente_pk = self.kwargs.get('paciente_pk')
        if paciente_pk:
            return Prontuario.objects.filter(paciente_id=paciente_pk)
        return Prontuario.objects.all()
