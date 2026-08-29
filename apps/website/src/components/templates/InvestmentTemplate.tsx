import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  ArrowRight, ArrowUpRight, BarChart3, Building2, Calculator,
  ChevronDown, ChevronRight, Download, Filter, Home, Info,
  LineChart, Mail, MapPin, Menu, Phone, PieChart, Play,
  Search, Shield, Star, Target, TrendingUp, X, Check,
  Briefcase, Landmark, Coins, FileText, CheckCircle2, AlertCircle,
  Clock, Map, Award, Users, Plus
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, LinkedinIcon, YoutubeIcon, ZaloIcon } from '../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// Elevated investment projects/properties list (6+ items)
const projectsData = [
  {
    id: 1,
    title: 'Grand Marina Center',
    location: 'Quận 1, TP.HCM',
    type: 'Căn hộ Hạng Sang',
    expectedRoi: '12-15%',
    roiValue: 13.5, // numeric for sorting/filtering
    minInvest: '2.5 Tỷ',
    minInvestValue: 2.5, // in Billions (Tỷ)
    status: 'Đang mở bán',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    tags: ['Sổ hồng lâu dài', 'Quản lý 5 sao', 'Trung tâm Q1'],
    size: '75m2 - 120m2',
    price: '150 Tr/m2',
    description: 'Tổ hợp căn hộ thương hiệu Grand Marina sa hoa bậc nhất quận 1. Vị trí kim cương bên sông Sài Gòn, quản lý vận hành bởi Marriott International.',
    specification: 'Bàn giao hoàn thiện cao cấp, nội thất nhập khẩu từ Ý, thiết bị vệ sinh Kohler.'
  },
  {
    id: 2,
    title: 'Eco Smart City',
    location: 'Thủ Thiêm, TP Thủ Đức',
    type: 'Tổ hợp Thương mại',
    expectedRoi: '15-18%',
    roiValue: 16.5,
    minInvest: '5.0 Tỷ',
    minInvestValue: 5.0,
    status: 'Sắp ra mắt',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    tags: ['Trung tâm hành chính mới', 'Thanh toán giãn', 'View sông'],
    size: '120m2 - 350m2',
    price: '210 Tr/m2',
    description: 'Thành phố thông minh sinh thái tại phân khu chức năng số 2a của khu đô thị mới Thủ Thiêm, hợp tác cùng tập đoàn Lotte Hàn Quốc.',
    specification: 'Tiêu chuẩn xanh LEED Gold, hạ tầng thông minh tích hợp IoT, hầm kết nối trực tiếp ga Metro.'
  },
  {
    id: 3,
    title: 'Ocean Park Villa',
    location: 'Gia Lâm, Hà Nội',
    type: 'Biệt thự Đơn lập',
    expectedRoi: '10-12%',
    roiValue: 11.0,
    minInvest: '15 Tỷ',
    minInvestValue: 15.0,
    status: 'Sẵn sàng bàn giao',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tags: ['Đã có sổ', 'Khai thác cho thuê ngay', 'KĐT xanh'],
    size: '250m2 - 400m2',
    price: '180 Tr/m2',
    description: 'Biệt thự đơn lập view hồ nước mặn nhân tạo tại khu đô thị đáng sống Vinhomes Ocean Park, mang phong cách Địa Trung Hải phóng khoáng.',
    specification: 'Xây dựng 3 tầng 1 tum, sân vườn rộng, có gara ô tô riêng biệt.'
  },
  {
    id: 4,
    title: 'Seaside Resort Complex',
    location: 'Phú Quốc, Kiên Giang',
    type: 'Biệt thự nghỉ dưỡng',
    expectedRoi: '14-16%',
    roiValue: 15.0,
    minInvest: '8 Tỷ',
    minInvestValue: 8.0,
    status: 'Đang xây dựng',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tags: ['Cam kết lợi nhuận', 'Bàn giao full nội thất', 'Mặt biển'],
    size: '180m2 - 300m2',
    price: '90 Tr/m2',
    description: 'Tổ hợp nghỉ dưỡng 5 sao trải dài trên bãi biển Bãi Trường, Phú Quốc. Sở hữu bãi biển riêng và hồ bơi vô cực ngắm hoàng hôn.',
    specification: 'Bàn giao đầy đủ trang thiết bị nội thất 5 sao chuẩn quốc tế, nhận ngay 15 đêm nghỉ dưỡng miễn phí hàng năm.'
  },
  {
    id: 5,
    title: 'High-Tech Industrial Zone',
    location: 'Bến Cát, Bình Dương',
    type: 'Nhà xưởng & Kho bãi',
    expectedRoi: '8-10%',
    roiValue: 9.0,
    minInvest: '20 Tỷ',
    minInvestValue: 20.0,
    status: 'Đang mở bán',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    tags: ['Đã có sổ đỏ', 'Cho thuê dài hạn', 'Kết nối cao tốc'],
    size: '1000m2 - 5000m2',
    price: '15 Tr/m2',
    description: 'Khu nhà xưởng xây sẵn đạt chuẩn quốc tế tại trung tâm công nghiệp Bình Dương. Phù hợp cho các doanh nghiệp logistics và sản xuất công nghệ cao.',
    specification: 'Tải trọng sàn 3 tấn/m2, hệ thống PCCC tự động đạt chuẩn, trạm điện công suất lớn.'
  },
  {
    id: 6,
    title: 'Central Business Hub',
    location: 'Quận 3, TP.HCM',
    type: 'Văn phòng cho thuê',
    expectedRoi: '11-13%',
    roiValue: 12.0,
    minInvest: '12 Tỷ',
    minInvestValue: 12.0,
    status: 'Sắp ra mắt',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    tags: ['Tòa nhà hạng A', 'Dòng tiền ổn định', 'Mặt tiền đường lớn'],
    size: '80m2 - 500m2',
    price: '120 Tr/m2',
    description: 'Tòa nhà văn phòng hiện đại tọa lạc tại trung tâm Quận 3, thiết kế sang trọng tối ưu diện tích sử dụng, đáp ứng nhu cầu khắt khe của doanh nghiệp nước ngoài.',
    specification: 'Hệ thống điều hòa trung tâm thông minh, thang máy tốc độ cao, quản lý vận hành tự động.'
  }
];

// Elevated news/articles list (6+ items)
const newsData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    tag: 'Vĩ mô',
    title: 'Tác động của Luật Đất đai mới đến chu kỳ BĐS 2026-2030',
    date: '10/07/2026',
    author: 'Nguyễn Văn Minh - Chuyên gia Kinh tế',
    excerpt: 'Các chỉ báo vĩ mô đang cho thấy tín hiệu đảo chiều mạnh mẽ. Cơ hội cho nhà đầu tư sẵn tiền mặt nắm giữ tài sản giá trị.',
    content: 'Luật Đất đai mới chính thức có hiệu lực mang lại những thay đổi lớn về cách tính giá đất, bồi thường giải phóng mặt bằng, và siết chặt quy định phân lô bán nền. Điều này giúp thanh lọc thị trường, loại bỏ các chủ đầu tư yếu năng lực tài chính và tạo điều kiện phát triển bền vững cho các dự án xanh, cao cấp. Nhà đầu tư nên tập trung nguồn lực vào các khu vực đô thị vệ tinh lớn có quy hoạch hạ tầng rõ ràng.'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tag: 'Phân tích',
    title: 'Top 5 khu vực ven TP.HCM có tiềm năng tăng giá >20% năm tới',
    date: '05/07/2026',
    author: 'Trần Thanh Sơn - Giám đốc Nghiên cứu',
    excerpt: 'Dữ liệu giao dịch sơ cấp và thứ cấp ghi nhận dòng tiền dịch chuyển mạnh sang các tỉnh lân cận có hạ tầng phát triển.',
    content: 'Với việc hoàn thiện tuyến Vành đai 3 và cao tốc Bến Lức - Long Thành, các khu vực như Nhơn Trạch (Đồng Nai), Bến Cát (Bình Dương), và Đức Hòa (Long An) đang trở thành thỏi nam châm thu hút dòng vốn đầu tư. Đặc biệt phân khúc đất nền sổ đỏ và nhà phố thương mại có mức giá từ 2-4 tỷ đồng ghi nhận mức độ quan tâm tăng vọt.'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    tag: 'Báo cáo',
    title: 'Báo cáo thanh khoản phân khúc căn hộ hạng sang Q2/2026',
    date: '01/07/2026',
    author: 'InvestPro Research Team',
    excerpt: 'Tỷ lệ hấp thụ toàn thị trường đạt mức cao kỷ lục trong vòng 3 năm qua nhờ sự quay lại của dòng vốn ngoại.',
    content: 'Trong quý 2 năm 2026, lượng giao dịch căn hộ hạng sang tại Quận 1 và Thủ Thiêm tăng 25% so với quý trước. Khách mua chủ yếu là nhà đầu tư nước ngoài (chiếm 40%) và tầng lớp trung lưu mới nổi tại Việt Nam mong muốn tìm kênh trú ẩn tài sản an toàn trước áp lực lạm phát tăng nhẹ.'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80',
    tag: 'Xu hướng',
    title: 'Xu hướng căn hộ dịch vụ cao cấp: Dòng tiền ổn định 8-10%/năm',
    date: '28/06/2026',
    author: 'Phạm Minh Trí - Chuyên gia BĐS dòng tiền',
    excerpt: 'Phân tích chi tiết mô hình đầu tư căn hộ studio cho thuê hướng tới chuyên gia nước ngoài tại các đô thị lớn.',
    content: 'Căn hộ dịch vụ cao cấp phục vụ đối tượng chuyên gia nước ngoài đang là xu hướng được ưa chuộng nhờ tỷ suất sinh lời vượt trội so với gửi tiết kiệm. Lợi nhuận không chỉ đến từ giá thuê cao mà còn nhờ các dịch vụ đi kèm như dọn phòng, giặt là, quản lý thông minh. Các quận trung tâm như Quận 3, Quận Phú Nhuận vẫn giữ vị thế độc tôn về tỷ lệ lấp đầy.'
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    tag: 'Đầu tư',
    title: 'Chiến lược phân bổ danh mục đầu tư BĐS trong bối cảnh lãi suất thấp',
    date: '22/06/2026',
    author: 'Lê Thị Thu Thủy - Cố vấn Tài chính',
    excerpt: 'Lãi suất vay mua nhà giảm sâu tạo cơ hội tuyệt vời để sử dụng đòn bẩy tài chính thông minh tối ưu hóa lợi nhuận ròng.',
    content: 'Với mức lãi suất vay ưu đãi chỉ từ 6-7%/năm tại các ngân hàng thương mại, nhà đầu tư có thể cân nhắc sử dụng đòn bẩy tài chính với tỷ lệ 30-50% giá trị tài sản. Tuy nhiên, cần đảm bảo dòng tiền từ thu nhập ổn định hoặc từ chính nguồn thuê của BĐS đó đủ để chi trả gốc lãi hàng tháng nhằm tránh áp lực tài chính ngắn hạn.'
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    tag: 'Quy hoạch',
    title: 'Bản đồ quy hoạch hạ tầng giao thông trọng điểm phía Nam tầm nhìn 2030',
    date: '15/06/2026',
    author: 'Sở Quy hoạch & Kiến trúc',
    excerpt: 'Tổng hợp tiến độ các dự án hạ tầng lớn: Sân bay Long Thành, các tuyến Metro và Cao tốc liên vùng.',
    content: 'Hệ thống hạ tầng kết nối vùng phía Nam đang bước vào giai đoạn tăng tốc mạnh mẽ. Sân bay quốc tế Long Thành dự kiến hoàn thành giai đoạn 1 vào cuối năm 2026 sẽ kích thích sự phát triển vượt bậc của toàn bộ vùng kinh tế trọng điểm phía Nam. Nhà đầu tư đón đầu làn sóng này nên tìm kiếm quỹ đất hoặc nhà phố tại các vùng giáp ranh có kết nối giao thông thuận tiện.'
  }
];

// Gallery Images
const galleryImages = [
  { id: 1, type: 'commercial', title: 'Grand Marina Center', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 2, type: 'apartment', title: 'Eco Smart City Interior', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },
  { id: 3, type: 'resort', title: 'Seaside Resort Pool', img: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=800&q=80' },
  { id: 4, type: 'apartment', title: 'Luxury Penthouse Living', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 5, type: 'resort', title: 'Ocean Park Villa Garden', img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2294?w=800&q=80' },
  { id: 6, type: 'villa', title: 'Ocean Park Villa Exterior', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 7, type: 'resort', title: 'Seaside Resort Villa', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 8, type: 'commercial', title: 'Central Business Hub Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' }
];

const normalizeInvestmentPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'dau-tu'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function InvestmentTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [currentPage, setCurrentPageState] = useState(normalizeInvestmentPage(initialPage));

  useEffect(() => {
    setCurrentPageState(normalizeInvestmentPage(initialPage));
  }, [initialPage]);
  const setCurrentPage = (p: string) => {
    if (typeof setSelectedProject === "function") setSelectedProject(null);
    if (typeof setSelectedArticle === "function") setSelectedArticle(null);

    setCurrentPageState(p);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', `/demo/${templateSlug}/${p}`);
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRoi, setFilterRoi] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterBudget, setFilterBudget] = useState<string>('all');

  // Home Quick Search Local states
  const [homeFilterType, setHomeFilterType] = useState<string>('all');
  const [homeFilterBudget, setHomeFilterBudget] = useState<string>('all');
  const [homeFilterRoi, setHomeFilterRoi] = useState<string>('all');

  // Modals & Details states
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<string>('all');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  
  // Contact state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactBudget, setContactBudget] = useState<string>('Mức vốn dự kiến');
  const [contactMessage, setContactMessage] = useState<string>('');

  // ROI Calculator States (Works and recalculates yield dynamically using input price and rental yields)
  const [calcPrice, setCalcPrice] = useState<number>(5.0); // Tỷ VNĐ
  const [calcMonthlyRent, setCalcMonthlyRent] = useState<number>(20); // Triệu VNĐ
  const [calcAppreciation, setCalcAppreciation] = useState<number>(8); // % / năm
  const [calcYears, setCalcYears] = useState<number>(5); // Năm

  // Computed values for ROI/Yield Calculator
  const annualRent = calcMonthlyRent * 12; // Triệu
  const rentalYieldPercent = (annualRent / (calcPrice * 1000)) * 100;
  const totalRentalIncome = (annualRent * calcYears) / 1000; // Tỷ
  const projectedPropertyValue = calcPrice * Math.pow(1 + calcAppreciation / 100, calcYears); // Tỷ
  const capitalGain = projectedPropertyValue - calcPrice; // Tỷ
  const totalReturn = totalRentalIncome + capitalGain; // Tỷ
  const totalRoiPercent = (totalReturn / calcPrice) * 100;

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => setMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(page === 'contact' ? false : mobileMenuOpen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeSearch = () => {
    setFilterType(homeFilterType);
    setFilterBudget(homeFilterBudget);
    setFilterRoi(homeFilterRoi);
    navigateTo('projects');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('Vui lòng điền họ tên và số điện thoại!');
      return;
    }
    setContactSubmitted(true);
  };

  const handleResetContact = () => {
    setContactSubmitted(false);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactBudget('Mức vốn dự kiến');
    setContactMessage('');
  };

  const isMobile = viewport === 'mobile';
  
  const colors = {
    bg: '#EFF6FF',
    primary: '#1E40AF',
    accent: '#10B981',
    text: '#1F2937',
    textMuted: '#4B5563',
    white: '#FFFFFF',
    border: '#E5E7EB'
  };

  // Reactive Project Filtering
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = filterLocation === 'all' || project.location.includes(filterLocation);
    const matchesType = filterType === 'all' || project.type === filterType;

    let matchesRoi = true;
    if (filterRoi !== 'all') {
      const value = project.roiValue;
      if (filterRoi === 'under-12') matchesRoi = value < 12;
      else if (filterRoi === '12-15') matchesRoi = value >= 12 && value <= 15;
      else if (filterRoi === 'over-15') matchesRoi = value > 15;
    }

    let matchesBudget = true;
    if (filterBudget !== 'all') {
      const budgetVal = project.minInvestValue;
      if (filterBudget === 'under-5') matchesBudget = budgetVal < 5;
      else if (filterBudget === '5-15') matchesBudget = budgetVal >= 5 && budgetVal <= 15;
      else if (filterBudget === 'over-15') matchesBudget = budgetVal > 15;
    }

    return matchesSearch && matchesLocation && matchesType && matchesRoi && matchesBudget;
  });

  const renderTicker = () => (
    <div style={{ backgroundColor: '#0f172a' }} className="text-white text-xs py-1.5 overflow-hidden whitespace-nowrap hidden md:block border-b border-gray-800">
      <div className="flex w-max px-4">
        <div className="flex gap-8 px-4">
          <span><span className="font-bold text-gray-400 mr-1">VnIndex:</span> 1,245.30 <span className="text-[#10B981] ml-1">▲ 12.4 (1.01%)</span></span>
          <span><span className="font-bold text-gray-400 mr-1">Lãi suất HĐ:</span> 4.5% - 5.5%/năm</span>
          <span><span className="font-bold text-gray-400 mr-1">SJC (Mua-Bán):</span> 79.5M - 81.5M/lượng <span className="text-rose-400 ml-1">▼ 0.2M</span></span>
          <span><span className="font-bold text-gray-400 mr-1">Tỷ giá USD/VND:</span> 25,230 <span className="text-[#10B981] ml-1">▲ 15</span></span>
          <span><span className="font-bold text-gray-400 mr-1">Dự án Alpha:</span> Đang mở bán <span className="text-[#10B981] ml-1">Cam kết LN 12%/năm</span></span>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between`}>
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
          <div style={{ backgroundColor: colors.primary }} className="p-1.5 md:p-2 rounded-lg text-white group-hover:bg-blue-800 transition-colors">
            <TrendingUp size={isMobile ? 20 : 24} />
          </div>
          <div>
            <h1 style={{ color: colors.primary }} className="font-bold text-lg md:text-xl leading-none tracking-tight">InvestPro</h1>
            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-widest uppercase">Capital & Partners</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {[
            { id: 'home', label: 'Tổng Quan' },
            { id: 'projects', label: 'Cơ Hội Đầu Tư' },
            { id: 'about', label: 'Hồ Sơ Năng Lực' },
            { id: 'gallery', label: 'Thư Viện' },
            { id: 'news', label: 'Báo Cáo TT' },
            { id: 'contact', label: 'Liên Hệ' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`text-[13px] xl:text-sm font-semibold transition-colors hover:text-[#10B981] uppercase tracking-wide
                ${currentPage === item.id ? 'text-[#10B981] border-b-2 border-[#10B981] py-1' : 'text-gray-600'}
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button className="text-sm font-bold text-gray-700 hover:text-[#1E40AF] flex items-center gap-2 transition-colors">
            <Phone size={16} /> 1900 6868
          </button>
          <button 
            onClick={() => navigateTo('contact')}
            style={{ backgroundColor: colors.primary }} 
            className="text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Đăng ký tư vấn <ArrowRight size={16} />
          </button>
        </div>

        <button className="lg:hidden text-gray-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col z-50">
          {[
            { id: 'home', label: 'Tổng Quan' },
            { id: 'projects', label: 'Cơ Hội Đầu Tư' },
            { id: 'about', label: 'Hồ Sơ Năng Lực' },
            { id: 'gallery', label: 'Thư Viện' },
            { id: 'news', label: 'Báo Cáo TT' },
            { id: 'contact', label: 'Liên Hệ' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`text-left text-sm font-bold py-4 px-6 border-b border-gray-50 uppercase tracking-wide ${currentPage === item.id ? 'text-[#10B981] bg-gray-50' : 'text-gray-700'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="p-6 bg-gray-50">
            <button 
              onClick={() => navigateTo('contact')}
              style={{ backgroundColor: colors.primary }} 
              className="text-white px-5 py-3 rounded text-sm font-bold w-full flex items-center justify-center gap-2 shadow-md"
            >
              Đăng ký tư vấn ngay <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );

  const renderFooter = () => (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-[#1E40AF]">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12`}>
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div style={{ backgroundColor: colors.primary }} className="p-2 rounded-lg text-white">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="font-bold text-xl leading-none tracking-tight">InvestPro</h2>
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Capital & Partners</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Đơn vị tư vấn và quản lý danh mục đầu tư bất động sản hàng đầu, mang đến giải pháp sinh lời bền vững và an toàn cho nhà đầu tư chuyên nghiệp.
          </p>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-[#0068FF] hover:text-white transition-colors p-1.5">
              <ZaloIcon className="w-full h-full" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-colors">
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Danh mục đầu tư</h4>
          <ul className="space-y-3">
            {['BĐS Thương mại', 'BĐS Nghỉ dưỡng', 'BĐS Công nghiệp', 'Căn hộ Hạng sang', 'Quản lý tài sản'].map(item => (
              <li key={item}>
                <button onClick={() => navigateTo('projects')} className="text-gray-400 hover:text-[#10B981] text-sm transition-colors flex items-center gap-2 cursor-pointer">
                  <ChevronRight size={14} /> {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Thông tin chi tiết</h4>
          <ul className="space-y-3">
            {['Hồ sơ năng lực (PDF)', 'Báo cáo thị trường Q2/2026', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'Cơ hội nghề nghiệp'].map(item => (
              <li key={item}>
                <button onClick={() => navigateTo('about')} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 cursor-pointer">
                  <ChevronRight size={14} /> {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Trụ sở chính</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#10B981] shrink-0 mt-0.5" />
              <span>Tầng 45, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Q1, TP.HCM</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#10B981] shrink-0" />
              <span>1900 6868 (Hotline Tư vấn 24/7)</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#10B981] shrink-0" />
              <span>invest@investpro.com.vn</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className="text-gray-500 text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} InvestPro Capital & Partners. Tất cả quyền được bảo lưu. <br className="md:hidden" />Bản quyền thuộc về nền tảng BDS.
        </p>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <span>Phiên bản v2.4.0</span>
          <span>|</span>
          <span className="flex items-center gap-1"><Shield size={12} className="text-[#10B981]" /> Cổng bảo mật SSL 256-bit</span>
        </div>
      </div>
    </footer>
  );

  const renderHome = () => (
    <div className={`bg-[#EFF6FF] min-h-screen pb-12`}>
      {/* HERO Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1600&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
        
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12`}>
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-500/30 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Cập nhật dữ liệu thị trường Q2/2026
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Đầu tư thông minh, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Sinh lời bền vững</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
              Nền tảng phân tích và tư vấn đầu tư bất động sản số 1. Cung cấp dữ liệu minh bạch, giải pháp tối ưu và lợi suất vượt trội cho nhà đầu tư chuyên nghiệp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => navigateTo('projects')} style={{ backgroundColor: colors.primary }} className="px-8 py-4 rounded-md font-bold text-white hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                Khám phá danh mục <ArrowRight size={18} />
              </button>
              <button onClick={() => navigateTo('news')} className="px-8 py-4 rounded-md font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2">
                Báo cáo thị trường mới <Download size={18} />
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 p-4 md:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Hiệu suất Quỹ InvestPro</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs">1M</span>
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">1Y</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs">ALL</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-gray-400 text-xs mb-1">Tổng tài sản quản lý</p>
                  <p className="text-2xl font-bold font-mono">15.2K Tỷ</p>
                  <p className="text-emerald-400 text-xs flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +18.4% YoY</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-gray-400 text-xs mb-1">Lợi nhuận trung bình</p>
                  <p className="text-2xl font-bold font-mono text-emerald-400">14.5%<span className="text-sm">/năm</span></p>
                  <p className="text-emerald-400 text-xs flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> Vượt thị trường</p>
                </div>
              </div>
              
              <div className="h-32 w-full flex items-end gap-2">
                {[40, 50, 45, 60, 75, 65, 80, 95, 85, 100].map((height, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-sm" style={{ height: `${height}%`, opacity: 0.8 + (i * 0.02) }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="-mt-10 relative z-20">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Loại hình đầu tư</label>
              <select 
                value={homeFilterType}
                onChange={(e) => setHomeFilterType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#1E40AF] focus:border-[#1E40AF] block p-3 font-medium outline-none"
              >
                <option value="all">Tất cả loại hình</option>
                <option value="Căn hộ Hạng Sang">Căn hộ Hạng Sang</option>
                <option value="Tổ hợp Thương mại">Tổ hợp Thương mại</option>
                <option value="Biệt thự nghỉ dưỡng">Biệt thự nghỉ dưỡng</option>
                <option value="Văn phòng cho thuê">Văn phòng cho thuê</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mức vốn dự kiến</label>
              <select 
                value={homeFilterBudget}
                onChange={(e) => setHomeFilterBudget(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#1E40AF] focus:border-[#1E40AF] block p-3 font-medium outline-none"
              >
                <option value="all">Mọi mức vốn</option>
                <option value="under-5">Dưới 5 tỷ</option>
                <option value="5-15">5 - 15 tỷ</option>
                <option value="over-15">Trên 15 tỷ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mục tiêu lợi nhuận</label>
              <select 
                value={homeFilterRoi}
                onChange={(e) => setHomeFilterRoi(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#1E40AF] focus:border-[#1E40AF] block p-3 font-medium outline-none"
              >
                <option value="all">Mọi mức ROI</option>
                <option value="under-12">Dưới 12% / năm</option>
                <option value="12-15">12% - 15% / năm</option>
                <option value="over-15">Trên 15% / năm</option>
              </select>
            </div>
            <button 
              onClick={handleHomeSearch}
              style={{ backgroundColor: colors.primary }} 
              className="w-full text-white font-bold p-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base h-11"
            >
              <Search size={18} /> Phân Tích Danh Mục
            </button>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-16 bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chỉ Số Thị Trường Nổi Bật</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Dữ liệu được tổng hợp và phân tích thời gian thực từ mạng lưới đối tác chiến lược và hệ thống đánh giá độc quyền.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Thanh Khoản Q2', value: '45,200', unit: 'Giao dịch', trend: '+15.2%', icon: BarChart3, desc: 'Tăng trưởng so với cùng kỳ' },
              { title: 'Vốn FDI Đổ Vào BĐS', value: '2.5', unit: 'Tỷ USD', trend: '+8.4%', icon: Map, desc: 'Tập trung công nghiệp & lưu trú' },
              { title: 'Tỷ Lệ Hấp Thụ', value: '78.5', unit: '%', trend: '+5.1%', icon: Target, desc: 'Phân khúc cao cấp tại TP.HCM' },
              { title: 'Lãi Suất Cho Vay', value: '6.5-8.5', unit: '%/năm', trend: '-1.2%', icon: Coins, desc: 'Mức thấp nhất trong 3 năm' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <stat.icon size={24} color={colors.primary} />
                  </div>
                  <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded">
                    <TrendingUp size={14} className="mr-1" /> {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wide">{stat.title}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-gray-500 font-medium">{stat.unit}</span>
                </div>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INVESTMENTS */}
      <section className="py-16 bg-[#EFF6FF]">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Cơ Hội Đầu Tư</span>
              <h2 className="text-3xl font-bold text-gray-900">Danh Mục Bất Động Sản Nổi Bật</h2>
            </div>
            <button className="hidden md:flex items-center text-[#1E40AF] font-bold hover:underline" onClick={() => navigateTo('projects')}>
              Xem toàn bộ danh mục <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.slice(0, 3).map(project => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-3 right-3 z-10 bg-[#10B981] text-white text-xs font-bold px-2 py-1 rounded">
                    ROI {project.expectedRoi}
                  </div>
                  <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded">
                    {project.status}
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <p className="text-white font-medium text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-[#10B981]"/> {project.location}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{project.type}</p>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-[#1E40AF] transition-colors">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Vốn tối thiểu</p>
                      <p className="font-bold text-[#1E40AF]">{project.minInvest}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full md:hidden py-3 rounded-lg border-2 border-[#1E40AF] text-[#1E40AF] font-bold" onClick={() => navigateTo('projects')}>
            Xem toàn bộ danh mục
          </button>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">So Sánh Kênh Đầu Tư 2026</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Phân tích đa chiều giúp nhà đầu tư đưa ra quyết định phân bổ nguồn vốn hợp lý trong bối cảnh kinh tế hiện tại.</p>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 border-b border-gray-200 font-bold text-gray-700 w-1/4">Tiêu chí</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-[#1E40AF] w-1/4 bg-blue-50/50">Bất Động Sản</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-gray-700 w-1/4">Chứng Khoán</th>
                  <th className="p-4 border-b border-gray-200 font-bold text-gray-700 w-1/4">Vàng / Gửi Tiết Kiệm</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Tỷ suất lợi nhuận kỳ vọng', bds: '10 - 20%/năm', stock: 'Biến động mạnh', gold: '4 - 7%/năm' },
                  { label: 'Mức độ rủi ro', bds: 'Thấp - Trung bình', stock: 'Cao', gold: 'Rất thấp' },
                  { label: 'Tính thanh khoản', bds: 'Trung bình', stock: 'Rất cao', gold: 'Rất cao' },
                  { label: 'Bảo vệ trước lạm phát', bds: 'Rất tốt', stock: 'Tốt', gold: 'Tốt' },
                  { label: 'Tạo dòng tiền thụ động', bds: 'Có (Cho thuê)', stock: 'Cổ tức (Không ổn định)', gold: 'Lãi suất cố định' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b border-gray-100 font-semibold text-gray-700">{row.label}</td>
                    <td className="p-4 border-b border-gray-100 font-bold text-[#1E40AF] bg-blue-50/50 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#10B981]" /> {row.bds}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-gray-600">{row.stock}</td>
                    <td className="p-4 border-b border-gray-100 text-gray-600">{row.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADVISORY STORY */}
      <section className="py-20 bg-[#EFF6FF] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 relative z-10`}>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-2xl transform rotate-2 opacity-20 blur-sm"></div>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80" 
                alt="Đội ngũ chuyên gia" 
                className="relative rounded-2xl shadow-2xl z-10 border-4 border-white object-cover h-[500px] w-full"
              />
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl z-20 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#1E40AF]">
                    <Award size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">15+</p>
                    <p className="text-gray-500 font-medium">Năm kinh nghiệm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-6">
              <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Về InvestPro</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Đối tác tin cậy trong quản lý gia sản & đầu tư BĐS
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chúng tôi không chỉ bán bất động sản, chúng tôi cung cấp giải pháp gia tăng tài sản. Đội ngũ chuyên gia từ các định chế tài chính lớn mang đến góc nhìn phân tích sắc bén, loại bỏ cảm tính trong quyết định đầu tư.
              </p>
              
              <ul className="space-y-4 mt-6">
                {[
                  'Thẩm định pháp lý khắt khe 3 lớp',
                  'Mô hình định giá độc quyền AI-driven',
                  'Cam kết đồng hành thanh khoản',
                  'Bảo mật thông tin khách hàng tuyệt đối'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-100 p-1 rounded text-[#10B981]">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="font-semibold text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <button className="bg-[#1E40AF] text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-800 transition-colors" onClick={() => navigateTo('about')}>
                  Tìm hiểu thêm về chúng tôi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BĐS */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 relative z-10`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tại Sao Chọn BĐS Làm Kênh Trú Ẩn?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Dữ liệu vĩ mô chứng minh bất động sản luôn là tấm khiên vững chắc nhất trước biến động kinh tế.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Hàng Rào Lạm Phát', desc: 'Giá trị BĐS và giá thuê tăng thuận chiều với lạm phát, bảo vệ sức mua của đồng vốn.' },
              { icon: TrendingUp, title: 'Lãi Kép Dài Hạn', desc: 'Sự kết hợp giữa tăng giá vốn và dòng tiền cho thuê tạo ra hiệu ứng lãi kép mạnh mẽ.' },
              { icon: Landmark, title: 'Đòn Bẩy Tài Chính', desc: 'Sử dụng vốn ngân hàng một cách thông minh để tối ưu hóa tỷ suất lợi nhuận ròng (ROE).' },
              { icon: Briefcase, title: 'Đa Dạng Danh Mục', desc: 'Giảm thiểu rủi ro cho danh mục đầu tư tổng thể nhờ tính tương quan thấp với chứng khoán.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors group">
                <div className="w-14 h-14 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC ROI CALCULATOR */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 w-full space-y-6">
              <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Công cụ phân tích độc quyền</span>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">Tính Toán Lợi Nhuận Dòng Tiền & Tăng Giá Trị</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nhập các thông số cơ bản của dự án bất động sản để tính toán nhanh Tỷ suất sinh lời từ tiền thuê và tổng lợi nhuận dự kiến bao gồm cả tăng trưởng vốn đất dài hạn.
              </p>
              
              <div className="space-y-6 pt-2">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-700 text-sm">Giá trị Bất động sản mua vào</label>
                    <span className="font-bold text-[#1E40AF]">{calcPrice.toFixed(1)} Tỷ VNĐ</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="50" step="0.5"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E40AF]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1 Tỷ</span>
                    <span>25 Tỷ</span>
                    <span>50 Tỷ</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-700 text-sm">Tiền thuê dự kiến hàng tháng</label>
                    <span className="font-bold text-[#1E40AF]">{calcMonthlyRent} Triệu / tháng</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" max="200" step="5"
                    value={calcMonthlyRent}
                    onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E40AF]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>5 Tr</span>
                    <span>100 Tr</span>
                    <span>200 Tr</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-700 text-sm">Tốc độ tăng giá đất trung bình năm</label>
                    <span className="font-bold text-[#1E40AF]">{calcAppreciation}% / năm</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="25" step="1"
                    value={calcAppreciation}
                    onChange={(e) => setCalcAppreciation(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E40AF]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>0% (Cố định)</span>
                    <span>12%</span>
                    <span>25%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-700 text-sm">Thời gian nắm giữ tài sản</label>
                    <span className="font-bold text-[#1E40AF]">{calcYears} Năm</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="15" step="1"
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E40AF]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1 Năm</span>
                    <span>8 Năm</span>
                    <span>15 Năm</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 w-full relative overflow-hidden space-y-6">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E40AF] to-[#10B981]"></div>
                
                <h3 className="text-center font-bold text-gray-500 uppercase tracking-wider text-xs">Phân tích hiệu suất đầu tư dự kiến</h3>
                
                <div className="text-center pb-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-400">TỔNG LỢI NHUẬN RÒNG DỰ KIẾN</p>
                  <p className="text-4xl sm:text-5xl font-black text-gray-900 font-mono tracking-tight my-2">
                    {totalReturn.toFixed(2)}
                    <span className="text-xl text-gray-500 ml-1">Tỷ VNĐ</span>
                  </p>
                  <p className="text-emerald-600 font-bold text-sm flex items-center justify-center gap-1.5">
                    <TrendingUp size={16} /> 
                    Tương đương ROI: {totalRoiPercent.toFixed(1)}%
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-semibold block mb-1">Tỷ suất cho thuê hàng năm</span>
                    <span className="font-bold text-gray-800 text-lg">
                      {rentalYieldPercent.toFixed(1)}% / năm
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-semibold block mb-1">Tổng tiền thuê thu được</span>
                    <span className="font-bold text-[#1E40AF] text-lg">
                      {totalRentalIncome.toFixed(2)} Tỷ VNĐ
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-semibold block mb-1">Giá trị BĐS sau {calcYears} năm</span>
                    <span className="font-bold text-gray-800 text-lg">
                      {projectedPropertyValue.toFixed(2)} Tỷ VNĐ
                    </span>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-800 text-xs font-semibold block mb-1">Mức tăng trưởng giá đất</span>
                    <span className="font-bold text-emerald-600 text-lg">
                      {capitalGain.toFixed(2)} Tỷ VNĐ
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setContactMessage(`Tôi đã dùng bảng tính ROI và muốn nhận bảng phân tích chi tiết dòng tiền cho BĐS giá ${calcPrice} Tỷ VNĐ, thuê ${calcMonthlyRent} Triệu/tháng.`);
                    navigateTo('contact');
                  }}
                  className="w-full bg-[#1E40AF] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} /> Nhận Báo Cáo Dòng Tiền Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK GALLERY PREVIEW */}
      <section className="py-16 bg-[#EFF6FF]">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Hình Ảnh Thực Tế</h2>
              <p className="text-gray-500 mt-2">Các dự án đã bàn giao và đi vào vận hành mang lại dòng tiền thực tế.</p>
            </div>
            <button className="hidden md:block border-2 border-[#1E40AF] text-[#1E40AF] px-6 py-2 rounded font-bold hover:bg-blue-50 transition-colors" onClick={() => navigateTo('gallery')}>
              Xem tất cả
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div onClick={() => setSelectedGalleryImg(galleryImages[0].img)} className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl h-96 cursor-pointer">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={galleryImages[0].img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery 1"/>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-lg">Biệt Thự Đảo Grand Marina</span>
              </div>
            </div>
            {galleryImages.slice(1, 5).map((img, i) => (
              <div key={i} onClick={() => setSelectedGalleryImg(img.img)} className="relative group overflow-hidden rounded-xl h-44 cursor-pointer">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery preview"/>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Plus size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-gray-150">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-16">
            <span className="text-[#10B981] font-bold tracking-wider uppercase text-sm mb-2 block">Thành tựu</span>
            <h2 className="text-3xl font-bold text-gray-900">Hành trình kiến tạo tài sản</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Anh Hoàng Nam', role: 'Giám đốc Công nghệ', text: 'Từ góc độ của một người phân tích dữ liệu, tôi đánh giá cao cách InvestPro lượng hóa rủi ro và tỷ suất sinh lời cho mỗi dự án. Rất chuyên nghiệp.', rating: 5 },
              { name: 'Chị Mai Lan', role: 'Nhà đầu tư cá nhân', text: 'Dịch vụ tư vấn không chỉ dừng lại ở việc bán nhà, mà còn hỗ trợ tôi cơ cấu lại toàn bộ danh mục tài sản để tạo dòng tiền ổn định 15%/năm.', rating: 5 },
              { name: 'Mr. John Smith', role: 'Expat Investor', text: 'As a foreigner navigating the VN real estate market, InvestPro provided the transparent data and legal clarity I needed. Exceptional service.', rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative">
                <div className="absolute -top-5 right-8 text-6xl text-blue-100 font-serif">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-6 relative z-10 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK NEWS SECTION */}
      <section className="py-16 bg-[#EFF6FF] border-t border-gray-100">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Báo Cáo & Phân Tích Mới Nhất</h2>
            </div>
            <button className="hidden md:flex items-center text-[#1E40AF] font-bold hover:underline" onClick={() => navigateTo('news')}>
              Xem tất cả bản tin <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.slice(0, 3).map((news) => (
              <div 
                key={news.id} 
                onClick={() => setSelectedArticle(news)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News"/>
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">{news.tag}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="font-semibold text-gray-500">{news.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {news.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-[#1E40AF] transition-colors">{news.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{news.excerpt}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <span className="text-[#10B981] font-semibold text-xs flex items-center">Đọc tiếp <ArrowRight size={14} className="ml-1"/></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Câu Hỏi Thường Gặp</h2>
            <div className="space-y-4">
              {[
                { q: 'InvestPro lựa chọn dự án dựa trên tiêu chí nào?', a: 'Chúng tôi sử dụng ma trận 25 tiêu chí định lượng và định tính, bao gồm pháp lý (quyết định giao đất, GPXD), năng lực tài chính của CĐT, lịch sử thanh khoản khu vực và tiềm năng tăng trưởng hạ tầng trong bán kính 5km.' },
                { q: 'Mức vốn tối thiểu để đầu tư qua InvestPro là bao nhiêu?', a: 'Tùy thuộc vào loại hình. Với mô hình đầu tư chung (Co-investment), mức vốn từ 500 triệu VNĐ. Với đầu tư sở hữu trực tiếp, mức vốn thường từ 2.5 tỷ VNĐ.' },
                { q: 'InvestPro có cam kết lợi nhuận không?', a: 'Chúng tôi cam kết tính minh bạch của dữ liệu và quy trình thẩm định. Tuy nhiên, ngoại trừ các dự án có chính sách cam kết thuê lại từ CĐT, đầu tư BĐS luôn đi kèm yếu tố thị trường nên không có cam kết lãi suất cố định.' },
                { q: 'Quy trình tư vấn của InvestPro diễn ra như thế nào?', a: '1. Khảo sát khẩu vị rủi ro và mục tiêu tài chính -> 2. Đề xuất danh mục phù hợp -> 3. Phân tích dòng tiền chi tiết -> 4. Hỗ trợ thủ tục pháp lý/tín dụng -> 5. Quản lý tài sản sau đầu tư.' }
              ].map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button 
                    className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors text-left font-bold text-gray-800"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    {faq.q}
                    {activeFaq === i ? <ChevronDown size={20} className="text-[#1E40AF]" /> : <ChevronRight size={20} className="text-gray-400" />}
                  </button>
                  {activeFaq === i && (
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 relative bg-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center"></div>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 relative z-10`}>
          <div className="bg-gradient-to-br from-[#1E40AF] to-blue-900 rounded-3xl p-8 md:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nhận tư vấn chiến lược 1:1</h2>
              <p className="text-blue-100 text-lg mb-8">Chuyên gia của chúng tôi sẽ thiết kế lộ trình đầu tư riêng biệt dựa trên nguồn vốn và mục tiêu của bạn.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400"/> Miễn phí định giá tài sản hiện tại</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400"/> Truy cập kho dữ liệu giao dịch nội bộ</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400"/> Cập nhật cơ hội Off-market (chưa public)</li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full bg-white rounded-2xl p-6 md:p-8 text-gray-900 shadow-xl">
              {contactSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Đăng ký thành công!</h3>
                  <p className="text-gray-600 text-sm">Cố vấn của chúng tôi sẽ liên hệ với bạn trong vòng 15 phút tới.</p>
                  <button onClick={handleResetContact} className="text-sm text-blue-600 font-bold hover:underline">Gửi yêu cầu mới</button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">Đăng ký thông tin</h3>
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <input 
                      type="text" 
                      placeholder="Họ và tên" 
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="tel" 
                        placeholder="Số điện thoại" 
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="Email (Tùy chọn)" 
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                      />
                    </div>
                    <select 
                      value={contactBudget} 
                      onChange={e => setContactBudget(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm text-gray-500"
                    >
                      <option value="Mức vốn dự kiến">Mức vốn dự kiến</option>
                      <option value="Dưới 3 tỷ">Dưới 3 tỷ</option>
                      <option value="3 - 10 tỷ">3 - 10 tỷ</option>
                      <option value="Trên 10 tỷ">Trên 10 tỷ</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: colors.primary }} className="w-full hover:bg-blue-800 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-base mt-2">
                      Yêu Cầu Chuyên Gia Gọi Lại
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">Thông tin của bạn được bảo mật tuyệt đối theo chuẩn ISO 27001.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
        <div className="text-center mb-12">
          <span className="text-[#10B981] font-bold text-sm tracking-wider uppercase mb-2 block">Cơ hội đầu tư</span>
          <h1 className="text-4xl font-bold text-[#1E40AF] mb-4">Danh Mục Đầu Tư Phân Bổ</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Tất cả dự án đều đã qua quy trình thẩm định 3 lớp khắt khe từ chuyên gia tài chính và pháp lý.</p>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm dự án, địa điểm, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm transition-all"
              />
            </div>
            
            {(searchQuery || filterLocation !== 'all' || filterType !== 'all' || filterRoi !== 'all' || filterBudget !== 'all') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterLocation('all');
                  setFilterType('all');
                  setFilterRoi('all');
                  setFilterBudget('all');
                }}
                className="px-5 py-3 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <X size={16} /> Xóa bộ lọc
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Khu vực / Tỉnh thành</label>
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-[#1E40AF] p-3 font-semibold outline-none"
              >
                <option value="all">Tất cả khu vực</option>
                <option value="Quận 1">Quận 1, TP.HCM</option>
                <option value="Thủ Thiêm">Thủ Thiêm, TP.HCM</option>
                <option value="Quận 3">Quận 3, TP.HCM</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Phú Quốc">Phú Quốc</option>
                <option value="Bình Dương">Bình Dương</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Loại hình sản phẩm</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-[#1E40AF] p-3 font-semibold outline-none"
              >
                <option value="all">Tất cả loại hình</option>
                <option value="Căn hộ Hạng Sang">Căn hộ Hạng Sang</option>
                <option value="Tổ hợp Thương mại">Tổ hợp Thương mại</option>
                <option value="Biệt thự Đơn lập">Biệt thự Đơn lập</option>
                <option value="Biệt thự nghỉ dưỡng">Biệt thự nghỉ dưỡng</option>
                <option value="Nhà xưởng & Kho bãi">Nhà xưởng & Kho bãi</option>
                <option value="Văn phòng cho thuê">Văn phòng cho thuê</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lợi nhuận dự kiến (ROI)</label>
              <select
                value={filterRoi}
                onChange={(e) => setFilterRoi(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-[#1E40AF] p-3 font-semibold outline-none"
              >
                <option value="all">Mọi mức ROI</option>
                <option value="under-12">Dưới 12% / năm</option>
                <option value="12-15">Từ 12% - 15% / năm</option>
                <option value="over-15">Trên 15% / năm</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mức vốn tối thiểu</label>
              <select
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-2 focus:ring-[#1E40AF] p-3 font-semibold outline-none"
              >
                <option value="all">Mọi mức vốn</option>
                <option value="under-5">Dưới 5 Tỷ</option>
                <option value="5-15">Từ 5 - 15 Tỷ</option>
                <option value="over-15">Trên 15 Tỷ</option>
              </select>
            </div>
          </div>
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Không tìm thấy cơ hội đầu tư phù hợp</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">Thử đặt lại bộ lọc hoặc thay đổi từ khóa để hiển thị thêm nhiều dự án hơn.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterLocation('all');
                setFilterType('all');
                setFilterRoi('all');
                setFilterBudget('all');
              }}
              style={{ backgroundColor: colors.primary }}
              className="text-white px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors text-sm"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">ROI: {project.expectedRoi}</div>
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">{project.status}</div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">{project.type}</span>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> {project.location}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-gray-50 text-gray-500 text-[10px] font-semibold px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Vốn tối thiểu</p>
                      <p className="font-bold text-[#1E40AF]">{project.minInvest}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-semibold text-[#10B981] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Chi tiết <ChevronRight size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-20 relative">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center"></div>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 text-center relative z-10`}>
          <span className="text-[#10B981] font-bold text-sm tracking-wider uppercase mb-3 block">Hồ Sơ Năng Lực</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kiến Tạo Tương Lai Gia Sản</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi kết hợp sự nhạy bén của thị trường với kỷ luật tài chính nghiêm ngặt để bảo vệ và phát triển tài sản bền vững cho khách hàng.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 py-20 border-b border-gray-100`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase">Tầm nhìn & Sứ mệnh</span>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">Định hướng thị trường bằng dữ liệu và sự minh bạch</h2>
            <p className="text-gray-600 leading-relaxed">
              Không chạy theo tâm lý đám đông hay các cơn sốt đất ảo, InvestPro đưa ra quyết định dựa trên số liệu vĩ mô, quy hoạch hạ tầng chính thống và biên an toàn tài chính. Chúng tôi tin rằng, thành công trong đầu tư bất động sản không đến từ việc suy đoán may rủi, mà đến từ việc mua đúng thời điểm, định giá đúng và quản trị rủi ro hiệu quả.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mỗi sản phẩm nằm trong danh mục của chúng tôi đều trải qua quy trình thẩm định nghiêm ngặt gồm 3 lớp: Pháp lý hoàn chỉnh, khảo sát thực địa độc lập và thẩm định tài chính đầu ra.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-2xl transform rotate-2 opacity-10 blur-sm"></div>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Team" className="relative rounded-2xl shadow-xl w-full object-cover h-[350px] z-10 border-4 border-white"/>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-20 border-b border-gray-100">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-16">
            <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Giá trị cốt lõi</span>
            <h2 className="text-3xl font-bold text-gray-900">Chuẩn mực của sự chuyên nghiệp</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Chính Trực Tuyệt Đối', desc: 'Minh bạch 100% về thông tin dự án, pháp lý và rủi ro. Không phóng đại lợi nhuận ảo, luôn bảo vệ quyền lợi hợp pháp của nhà đầu tư.' },
              { icon: Target, title: 'Định Lượng Bằng Số Liệu', desc: 'Mọi cơ hội đầu tư được sàng lọc qua mô hình đánh giá AI và dữ liệu lớn (Big Data). Thay thế cảm tính bằng phân tích khoa học.' },
              { icon: Users, title: 'Khách Hàng Là Trọng Tâm', desc: 'Thiết kế danh mục đầu tư may đo riêng biệt phù hợp với năng lực tài chính, khẩu vị rủi ro và kỳ vọng dòng tiền của từng gia đình.' }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-[#1E40AF] rounded-lg flex items-center justify-center mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 py-20 border-b border-gray-100`}>
        <div className="text-center mb-16">
          <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Chặng đường phát triển</span>
          <h2 className="text-3xl font-bold text-gray-900">Cột mốc lịch sử đáng nhớ</h2>
        </div>
        <div className="relative border-l-2 border-blue-200 max-w-3xl mx-auto pl-8 space-y-12">
          {[
            { year: '2015', title: 'Thành lập InvestPro', desc: 'Khởi đầu là văn phòng tư vấn pháp lý và thẩm định giá dự án BĐS tại TP.HCM.' },
            { year: '2018', title: 'Mở rộng quy mô & Khối Quản lý Quỹ', desc: 'Ra mắt dịch vụ cơ cấu danh mục tài sản cho khách hàng cá nhân cao cấp (HNWIs), nâng số lượng chuyên gia lên 50 người.' },
            { year: '2021', title: 'Vượt mốc 5.000 Tỷ AUM', desc: 'Số vốn quản lý và tư vấn thành công vượt mốc 5.000 Tỷ đồng, mở văn phòng đại diện thứ 2 tại Hà Nội.' },
            { year: '2024', title: 'Chuyển đổi số & Tích hợp công nghệ AI', desc: 'Ra mắt nền tảng phân tích đầu tư số hóa InvestPro Platform, ứng dụng AI định giá tự động và quét rủi ro quy hoạch.' },
            { year: '2026', title: 'Đạt mốc 15.200 Tỷ AUM', desc: 'Khẳng định vị thế hàng đầu Việt Nam trong lĩnh vực phân tích và tư vấn đầu tư BĐS chuyên nghiệp.' }
          ].map((milestone, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-white border-4 border-[#1E40AF] rounded-full flex items-center justify-center"></div>
              <div>
                <span className="inline-block bg-blue-100 text-[#1E40AF] text-xs font-bold px-2.5 py-1 rounded-full mb-2">{milestone.year}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 py-20`}>
        <div className="text-center mb-16">
          <span className="text-[#1E40AF] font-bold text-sm tracking-wider uppercase mb-2 block">Đội ngũ lãnh đạo</span>
          <h2 className="text-3xl font-bold text-gray-900">Ban Điều Hành Chuyên Gia</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              name: 'Mr. Phạm Minh Hoàng',
              role: 'Founder & CEO',
              img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
              bio: 'Hơn 18 năm kinh nghiệm trong lĩnh vực quản lý đầu tư, cựu thành viên hội đồng đầu tư tại các Quỹ ngoại danh tiếng.'
            },
            {
              name: 'Dr. Nguyễn Hoài An',
              role: 'Giám đốc Phân tích vĩ mô',
              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
              bio: 'Tiến sĩ Tài chính từ NUS Singapore, chuyên gia hàng đầu về mô hình dự báo chu kỳ kinh tế vĩ mô và hạ tầng.'
            },
            {
              name: 'Mr. Johnathan Le',
              role: 'Trưởng bộ phận Thẩm định Pháp lý',
              img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
              bio: 'Cựu luật sư cấp cao với hơn 15 năm làm việc tại các hãng luật hàng đầu Việt Nam, chuyên gia xử lý hồ sơ pháp lý phức tạp.'
            },
            {
              name: 'Mrs. Lê Thùy Dương',
              role: 'Giám đốc Quản lý tài sản',
              img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
              bio: 'Hơn 10 năm kinh nghiệm quản lý vận hành dự án BĐS dòng tiền, tối ưu hóa tỷ suất lấp đầy và khai thác cho thuê.'
            }
          ].map((leader, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center flex flex-col h-full">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{leader.name}</h3>
                <p className="text-sm font-semibold text-[#1E40AF] mb-3">{leader.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-auto">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGallery = () => {
    const filteredGallery = galleryImages.filter(img => 
      selectedGalleryTab === 'all' || img.type === selectedGalleryTab
    );

    return (
      <div className={`bg-[#EFF6FF] min-h-screen py-12`}>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-12">
            <span className="text-[#10B981] font-bold text-sm tracking-wider uppercase mb-2 block">Thư viện dự án</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-4">Thư Viện Tài Sản Thực Tế</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Hình ảnh thực tế từ các tài sản đã được InvestPro thẩm định, vận hành và phân phối.</p>
          </div>

          {/* Gallery Category Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-start sm:justify-center hide-scrollbar">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'apartment', label: 'Căn hộ' },
              { id: 'villa', label: 'Biệt thự' },
              { id: 'resort', label: 'Nghỉ dưỡng' },
              { id: 'commercial', label: 'Thương mại' }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setSelectedGalleryTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-semibold whitespace-nowrap text-sm border transition-colors
                  ${selectedGalleryTab === tab.id 
                    ? 'bg-[#1E40AF] text-white border-[#1E40AF]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredGallery.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-150">
              <AlertCircle className="mx-auto text-gray-400 mb-3" size={36} />
              <p className="text-gray-500 font-semibold">Chưa có hình ảnh cho danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredGallery.map((img) => (
                <div 
                  key={img.id} 
                  onClick={() => setSelectedGalleryImg(img.img)}
                  className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer shadow-sm hover:shadow-lg transition-all"
                >
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                    src={img.img} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-sm leading-tight">{img.title}</p>
                    <p className="text-[#10B981] font-semibold text-xs uppercase tracking-wider mt-1">{
                      img.type === 'commercial' ? 'Thương mại' :
                      img.type === 'apartment' ? 'Căn hộ' :
                      img.type === 'resort' ? 'Nghỉ dưỡng' :
                      img.type === 'villa' ? 'Biệt thự' : 'Khác'
                    }</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = newsData.filter(news => 
      news.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      news.tag.toLowerCase().includes(searchNewsQuery.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
          <div className="text-center mb-12">
            <span className="text-[#10B981] font-bold text-sm tracking-wider uppercase mb-2 block">Báo cáo & Nhận định</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-4">Báo Cáo & Phân Tích Thị Trường</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Cung cấp báo cáo chuyên sâu, dữ liệu giao dịch thực tế và xu hướng vĩ mô hàng tuần.</p>
          </div>

          {/* News Search Bar */}
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề vĩ mô..."
              value={searchNewsQuery}
              onChange={(e) => setSearchNewsQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm shadow-sm"
            />
            {searchNewsQuery && (
              <button 
                onClick={() => setSearchNewsQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-150 shadow-sm">
              <AlertCircle className="mx-auto text-gray-400 mb-3" size={36} />
              <p className="text-gray-500 font-semibold">Không tìm thấy bài viết phù hợp với từ khóa.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => setSelectedArticle(news)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={news.title}/>
                    <span className="absolute top-3 left-3 bg-[#1E40AF] text-white text-xs font-bold px-2.5 py-1 rounded">
                      {news.tag}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="font-semibold text-gray-500">{news.author}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {news.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-[#1E40AF] transition-colors">{news.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                    </div>
                    <span className="text-[#10B981] font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Đọc tiếp <ArrowRight size={14} className="ml-1"/>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContactSuccess = () => (
    <div className="text-center py-12 px-6 bg-white rounded-2xl border border-gray-100 shadow-xl max-w-md mx-auto space-y-6">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-[#10B981] mx-auto">
        <CheckCircle2 size={36} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">Đăng ký thành công!</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Cảm ơn bạn <strong className="text-gray-900">{contactName}</strong> đã gửi yêu cầu tư vấn. Cố vấn của InvestPro sẽ liên hệ hỗ trợ bạn qua số điện thoại <strong className="text-gray-900">{contactPhone}</strong> trong vòng 15 phút.
      </p>
      <button 
        onClick={handleResetContact} 
        style={{ backgroundColor: colors.primary }}
        className="w-full text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-blue-800 transition-colors text-sm"
      >
        Gửi yêu cầu khác
      </button>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-white py-12">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6`}>
        <div className="text-center mb-16">
          <span className="text-[#10B981] font-bold text-sm tracking-wider uppercase mb-2 block">Liên hệ</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-4">Kết Nối Với Cố Vấn Đầu Tư</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Đội ngũ phân tích của chúng tôi sẽ liên hệ trong vòng 15 phút để hỗ trợ cấu trúc danh mục đầu tư riêng cho bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Thông tin liên hệ trực tiếp</h2>
            <p className="text-gray-600">Bạn có thể ghé thăm trực tiếp văn phòng hoặc gọi điện qua Hotline 24/7 để nhận tư vấn nhanh chóng nhất.</p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-blue-50 text-[#1E40AF] rounded-xl shrink-0"><MapPin size={24}/></div>
                <div>
                  <h4 className="font-bold text-gray-900">Trụ sở chính TP.HCM</h4>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">Tầng 45, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Quận 1, TP.HCM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-blue-50 text-[#1E40AF] rounded-xl shrink-0"><Phone size={24}/></div>
                <div>
                  <h4 className="font-bold text-gray-900">Tổng đài Tư vấn 24/7</h4>
                  <p className="text-gray-500 mt-1 text-sm">1900 6868 (Hotline chính thức) | 0900 123 456 (Zalo/Viber)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-blue-50 text-[#1E40AF] rounded-xl shrink-0"><Mail size={24}/></div>
                <div>
                  <h4 className="font-bold text-gray-900">Hòm thư điện tử</h4>
                  <p className="text-gray-500 mt-1 text-sm">invest@investpro.com.vn | contact@investpro.com.vn</p>
                </div>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-md flex flex-col h-60 bg-white">
              <div className="px-4 py-2 bg-slate-900 text-white flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 truncate"><MapPin size={14} className="text-[#10B981]" /> Bitexco Financial Tower — Quận 1, TP.HCM</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+Qu%E1%BA%ADn+1,+TP.HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-[10px] font-bold shrink-0"
                >
                  Mở Google Maps
                </a>
              </div>
              <div className="flex-1 w-full h-full">
                <iframe
                  title="Bản đồ Bitexco Financial Tower"
                  src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          
          <div>
            {contactSubmitted ? renderContactSuccess() : (
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-150 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Yêu cầu liên hệ khẩn cấp</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Họ và tên *</label>
                    <input 
                      type="text" 
                      placeholder="Nhập họ và tên..." 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        placeholder="Nhập số điện thoại..." 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email (Tùy chọn)</label>
                      <input 
                        type="email" 
                        placeholder="Nhập địa chỉ email..." 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mức vốn dự kiến đầu tư</label>
                    <select 
                      value={contactBudget}
                      onChange={(e) => setContactBudget(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm text-gray-700 font-medium"
                    >
                      <option value="Mức vốn dự kiến">Mức vốn dự kiến</option>
                      <option value="Dưới 3 tỷ">Dưới 3 tỷ</option>
                      <option value="3 - 10 tỷ">3 - 10 tỷ</option>
                      <option value="Trên 10 tỷ">Trên 10 tỷ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Yêu cầu chi tiết</label>
                    <textarea 
                      placeholder="Nêu rõ yêu cầu của bạn (Ví dụ: Tư vấn dòng tiền, quy hoạch, pháp lý...)" 
                      rows={4} 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-[#1E40AF] outline-none text-sm"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    style={{ backgroundColor: colors.primary }}
                    className="w-full text-white font-bold py-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base mt-2 flex items-center justify-center gap-2"
                  >
                    Gửi Yêu Cầu Chuyên Gia Gọi Lại
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">Thông tin đăng ký được mã hóa SSL an toàn tuyệt đối theo chuẩn quốc tế.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans flex flex-col min-h-screen text-gray-900 bg-white">
      {renderTicker()}
      {renderHeader()}
      <main className="flex-grow">
        {['home'].includes(currentPage) && renderHome()}
        {['projects', 'du-an', 'san-pham', 'dau-tu'].includes(currentPage) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(currentPage) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(currentPage) && renderGallery()}
        {['news', 'tin-tuc', 'bai-viet'].includes(currentPage) && renderNews()}
        {['contact', 'lien-he', 'tu-van'].includes(currentPage) && renderContact()}
        {!['home', 'projects', 'du-an', 'san-pham', 'dau-tu', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(currentPage) && renderHome()}
      </main>
      {renderFooter()}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="h-64 sm:h-80 relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-6">
                <div>
                  <span className="bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    ROI {selectedProject.expectedRoi}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-emerald-400 font-semibold flex items-center gap-1"><MapPin size={16}/> {selectedProject.location}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-gray-100">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Vốn tối thiểu</p>
                  <p className="text-sm font-bold text-[#1E40AF]">{selectedProject.minInvest}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Loại hình</p>
                  <p className="text-sm font-bold text-gray-800">{selectedProject.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Diện tích</p>
                  <p className="text-sm font-bold text-gray-800">{selectedProject.size}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Đơn giá m2</p>
                  <p className="text-sm font-bold text-[#10B981]">{selectedProject.price}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-1.5 mb-2"><Info size={18} className="text-[#1E40AF]"/> Mô tả chi tiết</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-1.5 mb-2"><CheckCircle2 size={18} className="text-[#10B981]"/> Thông số bàn giao</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.specification}</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    setContactMessage(`Tôi quan tâm đến cơ hội đầu tư dự án: ${selectedProject.title}. Xin hãy tư vấn thêm.`);
                    setSelectedProject(null);
                    navigateTo('contact');
                  }}
                  style={{ backgroundColor: colors.primary }}
                  className="flex-grow text-white font-bold py-3.5 rounded-lg text-center hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={18} /> Đăng Ký Tư Vấn Chi Tiết
                </button>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 border border-gray-200 hover:bg-gray-50 font-bold rounded-lg transition-colors text-gray-700 text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE FULL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="h-48 sm:h-64 bg-gray-200 relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                {selectedArticle.tag}
              </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock size={12}/> {selectedArticle.date}</span>
                <span>•</span>
                <span className="font-semibold text-gray-500">{selectedArticle.author}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{selectedArticle.title}</h2>
              
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-medium italic border-l-4 border-[#1E40AF] pl-4 py-1">
                {selectedArticle.excerpt}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line pt-2">
                {selectedArticle.content}
              </p>
              
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  style={{ backgroundColor: colors.primary }}
                  className="text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition-colors text-sm"
                >
                  Đóng Đọc Bản Tin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col justify-center items-center">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
              src={selectedGalleryImg} 
              alt="Lightbox" 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200" 
            />
            {(() => {
              const match = galleryImages.find(img => img.img === selectedGalleryImg);
              return match ? (
                <div className="text-center mt-4">
                  <h4 className="text-white text-lg font-bold">{match.title}</h4>
                  <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{
                    match.type === 'commercial' ? 'Thương mại' :
                    match.type === 'apartment' ? 'Căn hộ' :
                    match.type === 'resort' ? 'Nghỉ dưỡng' :
                    match.type === 'villa' ? 'Biệt thự' : 'Khác'
                  }</p>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

