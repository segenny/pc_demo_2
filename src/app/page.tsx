"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 최근 본 상품용 이미지
const recentItems = [
  {
    img: "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
    title: "겨울 니트 특가",
    price: "39,900원",
  },
  {
    img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg",
    title: "롱패딩 블랙",
    price: "89,000원",
  },
  {
    img: "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg",
    title: "기모 후드티",
    price: "42,800원",
  },
  {
    img: "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg",
    title: "겨울 부츠",
    price: "67,000원",
  },
];

// 특가 상품용 이미지
const dealItems = [
  {
    img: "https://cdn.pixabay.com/photo/2017/12/26/09/15/woman-3040029_1280.jpg",
    category: "겨울 아우터 특가",
    title: "프리미엄 구스다운 패딩",
    discount: "45%",
    price: "89,000원",
    originalPrice: "162,000원",
  },
  {
    img: "https://cdn.pixabay.com/photo/2014/08/26/21/48/sweatshirts-428607_1280.jpg",
    category: "니트 특가",
    title: "캐시미어 니트 스웨터",
    discount: "35%",
    price: "55,000원",
    originalPrice: "85,000원",
  },
  {
    img: "https://cdn.pixabay.com/photo/2017/08/01/11/48/blue-2564660_1280.jpg",
    category: "액세서리 특가",
    title: "겨울 머플러 세트",
    discount: "50%",
    price: "29,900원",
    originalPrice: "59,800원",
  },
];

// 카테고리 아이콘들
const categories = [
  { name: "패션", icon: "👕" },
  { name: "뷰티", icon: "💄" },
  { name: "식품", icon: "🍎" },
  { name: "리빙", icon: "🏠" },
];

// 타이틀 스타일 컴포넌트
const SectionTitle = ({
  children,
  extra,
}: {
  children: React.ReactNode;
  extra?: React.ReactNode;
}) => (
  <div className="flex justify-between items-center mb-1">
    <div className="text-base font-semibold text-gray-800">{children}</div>
    {extra && <div>{extra}</div>}
  </div>
);

// 서브타이틀 컴포넌트
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-indigo-600/80 font-medium">{children}</span>
);

// 이벤트 아이템 데이터
const eventItems = [
  {
    id: 1,
    img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg",
    title: "가격따락 특가",
    subText: "최대 80% 할인",
    url: "https://m.ssg.com/item/itemView.ssg?itemId=1000618013557",
  },
  {
    id: 2,
    img: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
    title: "블프세일",
    subText: "-50% 할인",
    url: "https://m.ssg.com/item/itemView.ssg?itemId=1000029178261",
  },
  {
    id: 3,
    img: "https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852114_1280.png",
    title: "2024 신년특가",
    subText: "새해 맞이 특별 할인",
    url: null, // 세 번째 이미지는 URL 없음
  },
];

// 상단에 데이터 추가
const trendingSearches = [
  { keyword: "롱패딩", status: "급상승", count: "2,157" },
  { keyword: "뽀글이", status: "new", count: "1,842" },
  { keyword: "기모팬츠", count: "1,576" },
  { keyword: "방한부츠", count: "1,203" },
  { keyword: "히트텍", status: "급상승", count: "1,054" },
  { keyword: "목도리", count: "987" },
];

// 상단에 데이터 추가
const promotionBanners = [
  {
    title: "신년맞이 럭키딜 🎊",
    description: "인기 상품 단독 특가",
    period: "1.1 - 1.31",
    discount: "최대 70%",
    bgImage:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800",
    linkUrl:
      "https://m-shinsegaemall.ssg.com/plan/planShop.ssg?dispCmptId=6000488006",
  },
  {
    title: "겨울 아우터 세일 ⛄",
    description: "따뜻한 겨울나기",
    period: "1.15 - 1.30",
    discount: "30~60%",
    bgImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    linkUrl:
      "https://m-shinsegaemall.ssg.com/plan/planShop.ssg?dispCmptId=6000338114",
  },
];

// 기프티쇼 데이터로 변경
const giftishowItems = [
  {
    bgImage: "https://images.unsplash.com/photo-1445116572660-236099ec97a0",
    brand: "스타벅스",
    title: "겨울 시즌 음료",
    description: "아메리카노 Tall 사이즈",
    price: "4,500원",
    discount: "10%",
    expiry: "30일",
    link: "https://m.ssg.com/item/itemView.ssg?itemId=1000048696890&siteNo=6004&salestrNo=6005&advertBidId=9999999998",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1593504049359-74330189a345",
    brand: "베스킨라빈스",
    title: "파인트 아이스크림",
    description: "파인트 교환권",
    price: "19,800원",
    discount: "15%",
    expiry: "60일",
    link: "https://m.ssg.com/item/itemView.ssg?itemId=1000048696890&siteNo=6004&salestrNo=6005&advertBidId=9999999998",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
    brand: "CGV",
    title: "2D 일반 관람권",
    description: "전국 CGV 사용가능",
    price: "13,000원",
    discount: "20%",
    expiry: "90일",
    link: "https://m.ssg.com/item/itemView.ssg?itemId=1000048696890&siteNo=6004&salestrNo=6005&advertBidId=9999999998",
  },
];

// 연관 검색어 데이터 추가
const relatedSearches = [
  {
    keyword: "패딩",
    tags: ["숏패딩", "롱패딩", "경량패딩"],
    brandTags: ["노스페이스", "나이키"],
  },
  {
    keyword: "니트",
    tags: ["라운드넥", "터틀넥", "가디건"],
    brandTags: ["유니클로", "자라"],
  },
  {
    keyword: "부츠",
    tags: ["앵클부츠", "롱부츠", "첼시부츠"],
    brandTags: ["닥터마틴", "UGG"],
  },
];

export default function Home() {
  // 기존 상태들과 함께 선언
  const [searchText, setSearchText] = useState("");
  const [iframeUrl, setIframeUrl] = useState(
    "https://m-shinsegaemall.ssg.com/"
  );
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [showLeftWidget, setShowLeftWidget] = useState(true);
  const [showRightWidget, setShowRightWidget] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);
  const [showOrderDraft, setShowOrderDraft] = useState(true);
  const [orderCount, setOrderCount] = useState(2);
  const [showAiRecommend, setShowAiRecommend] = useState(true);

  // 프로모션 관련 상태 추가
  const [showPromotion, setShowPromotion] = useState(true);
  const [showEvent, setShowEvent] = useState(true);

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showAppInstall, setShowAppInstall] = useState(true);

  // 검색 모드 상태 추가
  const [isSearchMode, setIsSearchMode] = useState(false);

  // 검색 관련 상태 추가
  const [showSearchWidget, setShowSearchWidget] = useState(false);
  const [isWidgetLeaving, setIsWidgetLeaving] = useState(false);

  // URL 변경 감지 및 검색 모드 설정
  useEffect(() => {
    const isSearchPage = iframeUrl.includes("search.ssg");
    setIsSearchMode(isSearchPage);

    if (isSearchPage) {
      // 기존 위젯들 사라지는 애니메이션
      setIsWidgetLeaving(true);
      setTimeout(() => {
        setShowPromotion(false);
        setShowEvent(false);
        setShowOrderDraft(false);
        setShowSignUp(false);
        setShowAppInstall(false);
        setIsWidgetLeaving(false);
        // 검색 위젯 표시
        setShowSearchWidget(true);
      }, 300);
    } else {
      // 검색 위젯 사라지는 애니메이션
      setIsWidgetLeaving(true);
      setTimeout(() => {
        setShowSearchWidget(false);
        setShowPromotion(true);
        setShowEvent(true);
        setShowOrderDraft(true);
        setShowSignUp(true);
        setShowAppInstall(true);
        setIsWidgetLeaving(false);
      }, 300);
    }
  }, [iframeUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      setIframeUrl(
        `https://m.ssg.com/search.ssg?query=${encodeURIComponent(searchText)}`
      );
    }
  };

  const handleItemClick = (url: string | null) => {
    setSelectedUrl(url);
    // 세번째 위젯 숨기기 로직 추가 가능
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    // 스크롤 진행률 계산 (0-100)
    console.log(scrollTop, scrollHeight);
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  return (
    <div className="min-h-screen">
      <div className="animated-gradient">
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[0.4fr_1fr] lg:grid-cols-[1fr_1.5fr_1fr] 
          gap-4 h-screen sm:p-0 md:p-4 lg:p-4 min-w-[600px] mx-auto"
        >
          {/* 왼쪽 위젯 - md부터 보이게 */}
          <div
            className={`hidden md:block col-start-1 transition-all duration-500 ${
              showLeftWidget
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            }`}
          >
            {showLeftWidget && (
              <>
                <div className="flex flex-col h-full">
                  <div className="flex-1 space-y-6">
                    <div className="max-w-[400px] w-full mx-auto bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative group">
                      <button
                        onClick={() => setShowLeftWidget(false)}
                        className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <form
                        onSubmit={handleSearch}
                        className="flex items-center bg-white rounded-lg shadow-md p-2.5 border border-gray-100"
                      >
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="원하시는 상품을 검색해보세요."
                            className="w-full py-1.5 pl-3 pr-10 outline-none text-sm rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500"
                          />
                          <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-lg transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4 text-gray-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>

                      <div className="mt-3">
                        <SectionTitle>실시간 인기 검색어 🔥</SectionTitle>
                        <SubTitle>지금 가장 많이 찾는 키워드예요!</SubTitle>
                        <div className="mt-3 space-y-2">
                          {trendingSearches.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setSearchText(item.keyword);
                                handleSearch(new Event("submit") as any);
                              }}
                              className="flex items-center justify-between cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-indigo-400 w-5">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-700 group-hover:text-indigo-500 transition-colors">
                                  {item.keyword}
                                </span>
                                {item.status && (
                                  <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                      item.status === "new"
                                        ? "bg-rose-100 text-rose-500"
                                        : "bg-amber-100 text-amber-500"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">
                                {item.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {showAiRecommend && (
                      <div className="max-w-[400px] w-full mx-auto bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative group">
                        <button
                          onClick={() => setShowAiRecommend(false)}
                          className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* AI 추천 카드 */}
                        <div>
                          <div className="p-3">
                            {/* 헤더 */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 text-indigo-600"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-indigo-900">
                                  AI 맞춤 추천
                                </h3>
                                <p className="text-xs text-indigo-600/70">
                                  최근 본 상품 기반
                                </p>
                              </div>
                            </div>

                            {/* 기본 추 상품 2개 */}
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                {
                                  id: 1,
                                  image:
                                    "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
                                  brand: "나이키",
                                  name: "NSW 클럽 크루넥 기모 맨투맨",
                                  price: "59,000",
                                  discount: "20%",
                                  originalPrice: "79,000",
                                },
                                {
                                  id: 2,
                                  image:
                                    "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg",
                                  brand: "아디다스",
                                  name: "오리지널 삼선 트랙탑",
                                  price: "89,000",
                                  discount: "30%",
                                  originalPrice: "129,000",
                                },
                              ].map((item) => (
                                <div
                                  key={item.id}
                                  className="group cursor-pointer w-full bg-gray-50 rounded-lg p-1.5 hover:bg-white hover:shadow-sm transition-all duration-200"
                                >
                                  <div className="aspect-square w-full h-[60px] rounded-lg overflow-hidden relative">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                      {item.discount}
                                    </div>
                                  </div>
                                  <div className="mt-1.5 space-y-0.5">
                                    <p className="text-[10px] font-medium text-indigo-500">
                                      {item.brand}
                                    </p>
                                    <p className="text-xs text-gray-700 line-clamp-1">
                                      {item.name}
                                    </p>
                                    <div className="flex items-center gap-1">
                                      <p className="text-xs font-medium text-gray-900">
                                        {item.price}원
                                      </p>
                                      <p className="text-[10px] text-gray-400 line-through">
                                        {item.originalPrice}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 호버시 나타나는 추가 추천들 */}
                        <div className="absolute left-0 right-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                            {/* 알고리즘 설명 섹션 */}
                            <div className="mb-3 pb-3 border-b border-gray-100">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                                  <span className="text-indigo-600 text-sm">
                                    🤖
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  비슷한 취향 추천
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 ml-8">
                                당신과 비슷한 취향을 가진 사람들이 좋아하는
                                상품이에요!
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {[
                                {
                                  id: 1,
                                  image:
                                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
                                  brand: "Mardi Mercredi",
                                  name: "캐시미어 블렌드 니트",
                                  price: "129,000",
                                  discount: "35%",
                                  originalPrice: "198,000",
                                  rating: 4.8,
                                  reviews: 128,
                                },
                                {
                                  id: 2,
                                  image:
                                    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
                                  brand: "ADHOC",
                                  name: "울 블렌드 와이드 팬츠",
                                  price: "89,000",
                                  discount: "40%",
                                  originalPrice: "148,000",
                                  rating: 4.9,
                                  reviews: 256,
                                },
                              ].map((item) => (
                                <div
                                  key={item.id}
                                  className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-200 group/item"
                                >
                                  <div className="relative rounded-lg overflow-hidden">
                                    <div className="aspect-square">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2">
                                      <span className="bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {item.discount}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="mt-2 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium text-indigo-600">
                                        {item.brand}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <span className="text-amber-400 text-xs">
                                          ★
                                        </span>
                                        <span className="text-[10px] text-gray-600">
                                          {item.rating}
                                        </span>
                                      </div>
                                    </div>

                                    <h3 className="text-sm text-gray-800 font-medium line-clamp-1">
                                      {item.name}
                                    </h3>

                                    <div className="flex items-end gap-1.5">
                                      <span className="text-base font-bold text-gray-900">
                                        {item.price}
                                      </span>
                                      <span className="text-xs text-gray-400 line-through mb-0.5">
                                        {item.originalPrice}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] text-gray-500">
                                        리뷰 {item.reviews.toLocaleString()}
                                      </span>
                                      <span className="text-xs text-indigo-500 font-medium">
                                        무료배송
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 중앙 아이프레임 */}
          <div
            className="h-full w-full col-span-1 md:col-start-2 lg:col-start-2 mx-auto relative z-20 
            sm:px-0 md:px-2 lg:px-2"
          >
            <iframe
              src={iframeUrl}
              className="w-full h-full border-none md:rounded-xl bg-white 
              shadow-[0_0_15px_rgba(0,0,0,0.1)] ring-1 ring-indigo-100 
              md:transform md:scale-[1.02] hover:shadow-2xl hover:-translate-y-0.5 
              transition-all duration-200"
            />
          </div>

          {/* 오른쪽 위젯 - lg부터 보이게 변경 */}
          <div
            className={`hidden lg:block lg:col-start-3 transition-all duration-500 ${
              showRightWidget
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className="h-full max-w-[400px] w-full mx-auto space-y-3 relative">
              <button
                onClick={() => setShowRightWidget(false)}
                className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {selectedUrl ? (
                <>
                  <iframe
                    src={selectedUrl}
                    className="w-full h-full border-none rounded-xl bg-white/90 shadow-sm"
                  />
                  <button
                    onClick={() => setSelectedUrl(null)}
                    className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  {showSignUp && (
                    <div
                      className={`relative mb-3 group ${
                        isWidgetLeaving ? "animate-slide-up" : ""
                      }`}
                    >
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-[95%] h-full bg-white/60 backdrop-blur-sm rounded-xl shadow-md 
                        border border-gray-100/80
                        transition-all duration-300
                        group-hover:opacity-0
                        scale-95"
                      />
                      <div
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[97%] h-full bg-white/75 backdrop-blur-sm rounded-xl shadow-md 
                        border border-gray-100/80
                        transition-all duration-300
                        group-hover:opacity-0
                        scale-97"
                      />

                      <div
                        className="relative bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100
                        transition-all duration-300 ease-in-out
                        hover:shadow-xl group-hover:bg-white"
                      >
                        <button
                          onClick={() => setShowSignUp(false)}
                          className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="flex items-center gap-3">
                          <div className="w-[42px] h-[42px] rounded-lg bg-rose-500/10 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-rose-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <line x1="19" y1="8" x2="19" y2="14" />
                              <line x1="22" y1="11" x2="16" y2="11" />
                            </svg>
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                회원가 마무리하기
                              </p>
                              <p className="text-xs text-gray-500">
                                추가 정보를 입력고 혜택받기
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIframeUrl(
                                  "https://member.ssg.com/m/member/join/simpleJoinIntro.ssg"
                                );
                              }}
                              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              이어하기
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                        <div className="overflow-hidden">
                          <div
                            className="bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 mt-2 
                            opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100
                            translate-y-[-10px] group-hover:translate-y-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-[42px] h-[42px] rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <span className="text-blue-500 text-lg">
                                  🎁
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  신규 가입 혜택
                                </p>
                                <p className="text-xs text-gray-500">
                                  대 1000원 할인 쿠폰팩
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 mt-2 
                            opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200
                            translate-y-[-10px] group-hover:translate-y-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-[42px] h-[42px] rounded-lg bg-green-500/10 flex items-center justify-center">
                                <span className="text-green-500 text-lg">
                                  💰
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  첫 구매 특별 혜택
                                </p>
                                <p className="text-xs text-gray-500">
                                  신규 회원 20% 할인
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showOrderDraft && (
                    <div
                      className={`bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100
                      transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-white mb-2 ${
                        isWidgetLeaving ? "animate-slide-up" : ""
                      }`}
                    >
                      <button
                        onClick={() => setShowOrderDraft(false)}
                        className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-[42px] h-[42px] rounded-lg bg-orange-500/10 flex items-center justify-center
                          transition-all duration-300 group-hover:scale-105"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-orange-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p
                              className="text-sm font-medium text-gray-800
                              transition-all duration-300 hover:translate-x-0.5"
                            >
                              작성중인 주문서
                            </p>
                            <p
                              className="text-xs text-gray-500
                              transition-all duration-300 hover:translate-x-0.5"
                            >
                              {orderCount}개의 상품
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIframeUrl(
                                "https://member.ssg.com/m/member/join/simpleJoinIntro.ssg"
                              );
                            }}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-lg 
                              transition-all duration-300 hover:shadow-md hover:scale-105"
                          >
                            이어하기
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showAppInstall && (
                    <div
                      className={`bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 mb-2 relative group ${
                        isWidgetLeaving ? "animate-slide-up" : ""
                      }`}
                    >
                      <button
                        onClick={() => setShowAppInstall(false)}
                        className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="w-[42px] h-[42px] rounded-lg bg-indigo-500/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-indigo-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="4"
                              y="2"
                              width="16"
                              height="20"
                              rx="2"
                              ry="2"
                            />
                            <line x1="12" y1="18" x2="12" y2="18" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            앱 설치하고 혜택받기 🎁
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            신규 가입시 5천원 쿠폰팩 증정
                          </p>
                          <div className="flex gap-1">
                            <input
                              type="tel"
                              placeholder="휴대폰 번호 력 (-없이)"
                              className="flex-1 text-xs px-2 py-1.5 rounded-lg border border-gray-200 
                              focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              maxLength={11}
                            />
                            <button
                              className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 
                              text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              받기
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 프로모션 정보 - 호버시 표시 */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                        <div className="overflow-hidden">
                          <div
                            className="mt-2 pt-2 border-t border-gray-100 
                            opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="text-indigo-500">✓</span>
                              <span>앱 전용 특가 상품 구매 가능</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <span className="text-indigo-500">✓</span>
                              <span>앱 설치 시 3천 포인트 시 적립</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showPromotion && (
                    <div
                      className={`bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative ${
                        isWidgetLeaving ? "animate-slide-up" : ""
                      }`}
                    >
                      <button
                        onClick={() => setShowPromotion(false)}
                        className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <SectionTitle>
                        <div className="flex items-center gap-2">
                          <img
                            src="https://cdn.giftishow.com/images/favicon/giftishow_favicon.ico"
                            alt="기프티쇼"
                            className="w-4 h-4"
                          />
                          기프티쇼 혜택
                        </div>
                      </SectionTitle>
                      <SubTitle>실시간 인기 기프티콘</SubTitle>

                      <div className="space-y-2 mt-2">
                        {giftishowItems.map((item, index) => (
                          <div
                            key={index}
                            className="relative h-[80px] rounded-lg overflow-hidden cursor-pointer group bg-white"
                            onClick={() => {
                              if (item.link) {
                                setIframeUrl(item.link);
                              }
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
                            <img
                              src={item.bgImage}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-0 left-0 p-3 z-20 w-full h-full flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white bg-rose-500/90 px-2 py-0.5 rounded-full">
                                    {item.brand}
                                  </span>
                                  <span className="text-xs text-white/90 bg-black/30 px-2 py-0.5 rounded-full">
                                    유효기간 {item.expiry}
                                  </span>
                                </div>
                                <p className="text-sm font-bold text-white drop-shadow-lg mt-1">
                                  {item.title}
                                </p>
                                <p className="text-xs text-white/90 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                              <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-white">
                                  {item.price}
                                </span>
                                <span className="text-xs font-bold text-rose-200 bg-rose-500/20 px-2 py-0.5 rounded-full">
                                  {item.discount} 할인
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showEvent && (
                    <div
                      className={`h-[200px] max-w-[400px] w-full mx-auto bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mt-auto relative ${
                        isWidgetLeaving ? "animate-slide-up" : ""
                      }`}
                    >
                      <button
                        onClick={() => setShowEvent(false)}
                        className="absolute -right-1 -top-1 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <SectionTitle>기획전 ✨</SectionTitle>
                      <SubTitle>트렌디한 겨울 아이템을 눈에!</SubTitle>
                      <div className="relative rounded-lg overflow-hidden shadow-sm mt-2 h-[120px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                        <img
                          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
                          alt="겨울 시즌 특가"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex flex-col justify-between p-3 z-20">
                          <div className="flex items-start justify-between">
                            <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                              ~70% SALE
                            </span>
                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-2 py-1 rounded-full">
                              12.15 - 12.31
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white drop-shadow-lg">
                              겨울 패션 위크
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-white/90 drop-shadow-lg">
                                아우터 & 니트 컬렉션
                              </p>
                              <span className="text-white/80">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showSearchWidget && (
                    <div
                      className="bg-white/95 backdrop-blur-sm p-4 mt-0 rounded-xl shadow-sm 
                      hover:shadow-lg transition-all duration-300 
                      max-w-[400px] w-full mx-auto bg-white/90 backdrop-blur-sm
                      ${isWidgetLeaving ? 'animate-slide-up' : 'animate-slide-down'}"
                      style={{ marginTop: "0px" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <SectionTitle>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 text-indigo-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line
                                  x1="21"
                                  y1="21"
                                  x2="16.65"
                                  y2="16.65"
                                ></line>
                              </svg>
                            </div>
                            연관 검색어
                          </div>
                        </SectionTitle>
                        <span className="text-xs text-gray-400">
                          실시간 업데이트
                        </span>
                      </div>

                      <div className="space-y-4">
                        {relatedSearches.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-50/80 backdrop-blur-sm p-3 rounded-xl 
                              hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-800">
                                {item.keyword}
                              </span>
                              <div className="flex-1 border-b border-dashed border-gray-200" />
                              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600">
                                연관 {item.tags.length + item.brandTags.length}
                              </span>
                            </div>

                            <div className="space-y-2">
                              {/* 일반 태그 */}
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags.map((tag, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setSearchText(tag);
                                      handleSearch(new Event("submit") as any);
                                    }}
                                    className="group px-2.5 py-1 text-xs bg-white hover:bg-gray-100 
                                      text-gray-700 rounded-lg border border-gray-100
                                      transition-all duration-200 hover:shadow-sm"
                                  >
                                    <div className="flex items-center gap-1">
                                      <span>{tag}</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3 text-gray-400 group-hover:text-indigo-500
                                          opacity-0 group-hover:opacity-100 transition-all duration-200"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <line
                                          x1="5"
                                          y1="12"
                                          x2="19"
                                          y2="12"
                                        ></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* 브랜드 태그 */}
                              <div className="flex flex-wrap gap-1.5">
                                {item.brandTags.map((brand, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setSearchText(brand);
                                      handleSearch(new Event("submit") as any);
                                    }}
                                    className="group px-2.5 py-1 text-xs bg-indigo-50 
                                      hover:bg-indigo-100 text-indigo-600 rounded-lg
                                      transition-all duration-200 hover:shadow-sm"
                                  >
                                    <div className="flex items-center gap-1">
                                      <span className="text-[10px] mr-0.5">
                                        ✦
                                      </span>
                                      <span>{brand}</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3 text-indigo-400 group-hover:text-indigo-500
                                          opacity-0 group-hover:opacity-100 transition-all duration-200"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <line
                                          x1="5"
                                          y1="12"
                                          x2="19"
                                          y2="12"
                                        ></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
