'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import * as THREE from 'three';

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
  product3d?: string
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
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        if (canvasRef.current && product.product3d) {
          const canvas = canvasRef.current;
          const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setClearColor(0xffffff, 1);

          const scene = new THREE.Scene();

          const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
          camera.position.z = 3;

          // Lights
          scene.add(new THREE.AmbientLight(0xffffff, 1));
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(1, 1, 1);
          scene.add(directionalLight);

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableZoom = false;
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;

          let model: THREE.Object3D | null = null;
          let rotationDirection = 1;

          const loader = new GLTFLoader();
          loader.load(
            product.product3d,
            (gltf) => {
              model = gltf.scene;

              // Center and scale model
              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());

              model.position.sub(center); // center it
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 2 / maxDim; // scale to fit
              model.scale.setScalar(scale); // uniform scaling

              scene.add(model);
              camera.lookAt(0, 0, 0);

              // Animation
              const animate = () => {
                requestAnimationFrame(animate);
                if (model) {
                  model.rotation.y += 0.001 * rotationDirection;
                }
                controls.update();
                renderer.render(scene, camera);
              };
              animate();
            },
            undefined,
            (error) => {
              console.error('Error loading GLTF model:', error);
            }
          );

          // Resize logic
          const resize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
          };
          window.addEventListener('resize', resize);
          resize();

          setInterval(() => {
            rotationDirection *= -1;
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            {/* Image Slider */}
            <div className="w-full max-w-full">
              <Swiper
                modules={[Pagination, EffectCoverflow, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                effect="coverflow"
                autoplay={{ delay: 3000 }}
                loop
                className="w-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${productName} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>



            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* <span className="text-3xl font-bold" style={{ color: 'rgb(76, 169, 88)' }}>
                    {product.price}
                  </span> */}
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
            {/* {!threejsLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                <div className="text-center text-gray-700">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-sm">Loading 3D Model...</p>
                </div>
              </div>
            )} */}

          </div>
        </div>
      </section>

    </div>
  )
}