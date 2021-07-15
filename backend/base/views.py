from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from .models import Product
from .products import products
from .serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/products/'
    '/api/products/create/',

    '/api/products/upload/',


  ]
  # return JsonResponse(routes, safe=False)
  return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    Serializer = ProductSerializer(products, many=True)
  # return JsonResponse(products, safe=False)
  # return Response(products)
    return Response(Serializer.data)   #18Serializing Data


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

    # product = None
    # for i in products:
    #   if i['_id'] == pk:
    #     product = i
    #     break
    # return Response(product)