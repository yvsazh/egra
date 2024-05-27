from django.shortcuts import render, reverse
from .forms import UserRegistrationForm
from django.contrib.auth import authenticate, login
from django.http import Http404, HttpResponseRedirect, JsonResponse
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()

            login(request, new_user)

            return HttpResponseRedirect(reverse('graphs:projects'))
    else:
        user_form = UserRegistrationForm()
    return render(request, 'account/register.html', {'user_form': user_form})