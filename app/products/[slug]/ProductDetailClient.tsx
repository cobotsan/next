'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface Product {
  name: string
  nametr?: string
  slug?: string
  slugtr?: string
  images: string[]
  description: string
  descriptiontr?: string
  featurestr?: string[]
  features: string[]
  specifications: Record<string, string>
  price: string
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [threejsLoaded, setThreejsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t, language } = useLanguage()

  const productName = language === 'tr' && product.nametr ? product.nametr : product.name
  const productDescription = language === 'tr' && product.descriptiontr ? product.descriptiontr : product.description
  const productFeatures = language === 'tr' && product.featurestr ? product.featurestr : product.features

    useEffect(() => {
  const loadThreeJS = async () => {
    try {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 1);
        
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 3;

        const geometry = new THREE.BoxGeometry(1, 2, 0.3);
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x4CA958,
          metalness: 0.6,
          roughness: 0.3,
          clearcoat: 0.7,
          clearcoatRoughness: 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(2, 3, 2);
        scene.add(directionalLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Ensure object centered
        camera.lookAt(cube.position);

        // Responsive resize
        const resize = () => {
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };
        window.addEventListener('resize', resize);
        resize();

        let rotationDirection = 1;
        
        // Animate
        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.y += 0.001 * rotationDirection;
          controls.update();
          renderer.render(scene, camera);
        };

        
        animate();

        setInterval(() => {
          rotationDirection *= -1; // switch direction every 3 sec
        }, 3000);
        
        setThreejsLoaded(true);

        return () => {
          window.removeEventListener('resize', resize);
          renderer.dispose();
        };
      }
    } catch (err) {
      console.error('Three.js load error:', err);
    }
  };

  loadThreeJS();
}, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-gray-900">
        <div className="text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {productName}
          </motion.h1>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Slider */}
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={`${productName} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    style={index === currentImageIndex ? { backgroundColor: 'rgb(76, 169, 88)' } : {}}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{productName}</h2>
                  <span className="text-3xl font-bold" style={{ color: 'rgb(76, 169, 88)' }}>
                    {product.price}
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-6">{productDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {productFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(76, 169, 88)' }} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <div className="text-sm text-gray-600 capitalize">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button size="lg" className="w-full text-lg" style={{ backgroundColor: 'rgb(76, 169, 88)' }}>
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Viewer */}
     <section className="py-20 bg-gradient-to-br from-white-100 via-green-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('modelviewer.title')}</h2>
            {/* <p className="text-gray-600">{t('modelviewer.description')}</p> */}
          </div>
          <div className="flex justify-center">
            
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-xl"
                style={{ background: 'white' }}
              />
              {!threejsLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                  <div className="text-center text-gray-700">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-sm">Loading 3D Model...</p>
                  </div>
                </div>
              )}
            
          </div>
        </div>
      </section>

    </div>
  )
}