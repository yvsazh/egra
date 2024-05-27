from django.shortcuts import render, reverse
from django.http import Http404, HttpResponseRedirect, JsonResponse
from django.utils import timezone
from .models import *
from django.core.files.base import ContentFile
import base64


def projects(request):
    if request.user.is_authenticated:
        projects = Project.objects.filter(user = request.user).order_by("-creation_date")
    
    else:
        projects = None

    return render(request, 'graphs/projects.html', {'projects': projects})

def public_projects(request):
    all_projects = Project.objects.order_by('-creation_date')
    if request.user.is_authenticated:
        projects = all_projects.exclude(user=request.user)
    else:
        projects = all_projects

    return render(request, 'graphs/public_projects.html', {'projects': projects})

def projects_of(request, user_id):

    requested_user = User.objects.get(id = user_id)

    projects = Project.objects.order_by('-creation_date').filter(user = requested_user)

    return render(request, 'graphs/public_projects.html', {'projects': projects, "requested_user": requested_user})


def project(request, project_id):
    project = Project.objects.get(id = project_id)

    return render(request, 'graphs/project.html', {'project': project})


def create_project(request):
    project = Project.objects.create(
        user = request.user,
        name = "New project",
        preview = 'media/default-preview.jpg',
        creation_date = timezone.now(),
    )

    return HttpResponseRedirect(reverse('graphs:project', args=(project.id, )))

def save_project(request, project_id):
    project = Project.objects.get(id = project_id)

    project.data = request.POST['saved_data']
    data_url = request.POST['new_preview']
    image_data = data_url.split(',')[1]
    decoded_image_data = base64.b64decode(image_data)

    project.preview.save(f'preview.jpg', ContentFile(decoded_image_data), save=True)

    project.save()

    return HttpResponseRedirect(reverse('graphs:project', args=(project.id, )))

def edit_project(request, project_id):
    project = Project.objects.get(id = project_id)

    project.name = request.POST['project_name']
    project.save()

    return HttpResponseRedirect(reverse('graphs:project', args=(project.id, )))

def delete_project(request, project_id):
    project = Project.objects.get(id = project_id)

    project.delete()

    return HttpResponseRedirect(reverse('graphs:projects'))
