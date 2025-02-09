import React, { useState } from 'react';
import axios from 'axios';

const FengShuiPage = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const result = await axios.post(
        ' http://10.10.122.250:5000/analyze-feng-shui',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResponse(result.data);
    } catch (error) {
      console.error('Error uploading the image:', error);
      alert('Error uploading the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">
                Feng Shui Planner
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Feng Shui for Your Space
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Learn how to arrange your space according to Feng Shui principles to
            enhance your energy flow and well-being.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="image-upload" className="block text-gray-700">
                Upload a Room Image
              </label>
              <input
                type="file"
                id="image-upload"
                name="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 border-2 border-gray-300 p-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Feng Shui'}
            </button>
          </form>

          {response && (
            <div className="mt-8 p-4 bg-green-50 rounded-md">
              <h3 className="text-xl font-semibold">Analysis Results</h3>
              <div>
                <h4 className="text-lg font-semibold">Detected Objects:</h4>
                <ul className="list-disc pl-5">
                  {response.detected_objects &&
                    response.detected_objects.map((obj, index) => (
                      <li key={index}>
                        {obj[0]} (Coordinates: {obj[1].join(', ')})
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold">Vastu Suggestions:</h4>
                <ul className="list-disc pl-5">
                  {response.vastu_suggestions &&
                    response.vastu_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FengShuiPage;
