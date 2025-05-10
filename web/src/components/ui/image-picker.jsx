// components/ImagePicker.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function ImagePicker(props) {
    const { preview, onChange } = props;

    const [images, setImages] = useState([]);

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        onChange({file, preview});
    };

    return (
        <label className="cursor-pointer">
            <Card className="w-40 h-40 flex items-center justify-center border-dashed border-2 hover:bg-gray-50 transition">
                <CardContent className="flex items-center justify-center p-0 w-full h-full">
                    {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="object-cover w-full h-full rounded-lg"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <Plus size={32} />
                            <span className="text-sm mt-2">Add Media</span>
                        </div>
                    )}
                </CardContent>
            </Card>
            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleChangeImage}
            />
        </label>
    )
}
