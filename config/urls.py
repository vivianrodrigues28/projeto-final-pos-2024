from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_nested.routers import NestedDefaultRouter 

from api import views

router = routers.DefaultRouter()

###### Rotas principais ######

router.register(r'especialidades', views.EspecialidadeViewSet, basename='especialidades')
router.register(r'medicos', views.MedicoViewSet, basename='medicos')
router.register(r'pacientes', views.PacienteViewSet, basename='pacientes')
router.register(r'enfermarias', views.EnfermariaViewSet, basename='enfermarias')
router.register(r'equipamentos', views.EquipamentoViewSet, basename='equipamentos')
router.register(r'prontuarios', views.ProntuarioViewSet, basename='prontuarios')

###############################

###### Rotas relacionadas ######

# Rotas aninhadas para especialidades
especialidade_router = NestedDefaultRouter(router, r'especialidades', lookup='especialidade')
especialidade_router.register(r'medicos', views.MedicoViewSet, basename='especialidade-medico')

# Rotas aninhadas para pacientes
paciente_router = NestedDefaultRouter(router, r'pacientes', lookup='paciente')
paciente_router.register(r'prontuarios', views.ProntuarioViewSet, basename='paciente-prontuario')

# Rotas aninhadas para enfermarias
enfermaria_router = NestedDefaultRouter(router, r'enfermarias', lookup='enfermaria')
enfermaria_router.register(r'equipamentos', views.EquipamentoViewSet, basename='enfermaria-equipamento')

################################

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('', include(especialidade_router.urls)),
    path('', include(paciente_router.urls)),
    path('', include(enfermaria_router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
