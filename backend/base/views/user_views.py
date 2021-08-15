from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# password
from django.contrib.auth.hashers import make_password
# error messageのstatus
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username  '#34で消去
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
          data[key] = value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
  data = request.data
  print('DATA:', data)

  try:
    user = User.objects.create(
      first_name = data['name'],
      username = data['email'],
      email=data['email'],
      password=make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user ,many=False)
    return Response(serializer.data)
  except:
    message = {'detail': 'user with this email already exists'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    Serializer = UserSerializer(users, many=True)
    return Response(Serializer.data)   #35