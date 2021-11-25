from django.shortcuts import render
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views import  View
from .models import Usuario
import json

# Create your views here.

class UsuarioView(View): 
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs ):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request,id=0):
        if(id > 0):
            users = list(Usuario.objects.filter(id = id).values())
            if len(users) > 0:
                usuario = users[0]
                datos = {
                    
                    'message': "Success",
                    'usuarios' : usuario

                }                
            else:
                datos = {'message': "usuario not found.."}
            return JsonResponse(datos)

        else:    
            users = list(Usuario.objects.values())
            if len(users) > 0:
                datos = {

                    'message': "Success",
                    'usuarios' : users

                }
            else:
                datos = {

                    'message': "usuario not found.."

                }
            return JsonResponse(datos)

    def post(self, request):
    
        usr=json.loads(request.body)
        Usuario.objects.create(
            usuario = usr['usuario'],
            password = usr['password'], 
            email = usr['email'] )
        datos = {'message': "Success"}
        return JsonResponse(datos) 



    def put(self, request, usuario):

        usr=json.loads(request.body)
        usuario = list(Usuario.objects.filter(id = id).values())
        if len(usuario) > 0:     
            user = Usuario.objects.get(id = id)
            user.usuario = usr['usuario']
            user.password = usr['password']
            user.email = usr['email']  
            user.save()
            datos = {'message': "succes"}
        else:
            datos = {'message': "usuarios not found.."}
        return JsonResponse(datos) 
    
    def delete(self, request, id):
        usuario = list(Usuario.objects.filter(id = id).values())
        if len(usuario) > 0: 
            Usuario.objects.filter(id = id).delete()
            datos = {'message': "succes"}            
        else:
            datos = {'message': "usuarios not found.."}
        return JsonResponse(datos)             