import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Search, Plus, Filter, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeProductImage } from '../services/geminiService';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{id: string, text: string} | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnalyze = async (id: string, imageUrl: string) => {
    setAnalyzingId(id);
    setAnalysisResult(null);
    try {
        // Fetch image and convert to base64 for demo purposes
        // In a real app, you might upload a local file
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = (reader.result as string).split(',')[1];
            const text = await analyzeProductImage(base64);
            setAnalysisResult({ id, text });
            setAnalyzingId(null);
        };
        reader.readAsDataURL(blob);
    } catch (e) {
        setAnalyzingId(null);
        alert("Failed to analyze image (CORS or network issue in demo)");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                      {product.status === 'Low Stock' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <button 
                        onClick={() => handleAnalyze(product.id, product.image)}
                        disabled={analyzingId === product.id}
                        className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                     >
                       <Sparkles className={`w-3 h-3 ${analyzingId === product.id ? 'animate-spin' : ''}`} />
                       {analyzingId === product.id ? 'Analyzing...' : 'AI Analyze'}
                     </button>
                  </td>
                </tr>
                {analysisResult && analysisResult.id === product.id && (
                    <tr className="bg-indigo-50/50">
                        <td colSpan={6} className="px-6 py-4">
                            <div className="text-sm text-slate-700 bg-white p-4 rounded-lg border border-indigo-100">
                                <h4 className="font-semibold text-indigo-900 mb-1 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Gemini Analysis
                                </h4>
                                <p className="whitespace-pre-wrap">{analysisResult.text}</p>
                            </div>
                        </td>
                    </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;