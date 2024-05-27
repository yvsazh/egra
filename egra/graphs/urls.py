from django.urls import path

from . import views

app_name = 'graphs'
urlpatterns = [
	path('', views.projects, name="projects"),
    path('projects_of/<int:user_id>', views.projects_of, name="projects_of"),
    path('public_projects/', views.public_projects, name="public_projects"),
    path('create_project/', views.create_project, name="create_project"),
    path('project/<int:project_id>', views.project, name="project"),
    path('save_project/<int:project_id>', views.save_project, name="save_project"),
    path('edit_project/<int:project_id>', views.edit_project, name="edit_project"),
    path('delete_project/<int:project_id>', views.delete_project, name="delete_project"),
]