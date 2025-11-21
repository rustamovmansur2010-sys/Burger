import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import robot from "../assets/aaa.png";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon raqamini kiriting";
    } else if (!/^\+998[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak";
    }

    if (!formData.password) {
      newErrors.password = "Parolni kiriting";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.password.length >= 6) {
        setUser({ 
          name: formData.phone,
          phone: formData.phone
        });
        navigate("/");
      } else {
        setErrors({ password: "Noto'g'ri parol" });
      }
    } catch (error) {
      setErrors({ general: "Tizimda xatolik yuz berdi" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center px-10">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="bg-green-600 text-white px-6 py-2 font-bold text-2xl rounded-lg shadow-md">
            FOOD100
          </h1>
        </div>
        
        <div className="w-[420px] bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Kirish</h3>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Telefon raqami
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 XX XXX XX XX"
                className={`w-full border px-4 py-3 rounded-lg outline-none transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">{errors.phone}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Parol
                </label>
                <span className="text-xs text-green-600 cursor-pointer hover:underline">
                  Parolni unutdingizmi?
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Parolni kiriting"
                className={`w-full border px-4 py-3 rounded-lg outline-none transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3 text-white rounded-xl text-[15px] font-medium duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Kirish...
                </div>
              ) : (
                'Kirish'
              )}
            </button>
          </form>

          {/* Register text */}
          <p className="text-sm mt-6 text-center text-gray-600">
            Men hali ro'yxatdan o'tmadim?{" "}
            <Link to="/register" className="text-green-600 font-medium hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 h-full relative">
        <img
          src={robot}
          alt="robot"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  );
};

export default Login;