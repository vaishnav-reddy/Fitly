import ImageUpload from '../components/ImageUpload';
import React from "react";

export default function Home() {
 return <div className='p-6'><h1 className='text-xl mb-4'>🏠 Welcome to Fitly Home</h1><ImageUpload onUpload={(file) => console.log(file)} /></div>;
}