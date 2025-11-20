"use client"

import React, { useState } from "react" 
import Link from "next/link"
import { Facebook, Instagram, Linkedin, X, ChevronDown } from "lucide-react" 
import ReactDOM from 'react-dom'; 

import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { useCategories } from "@/lib/sanity/hooks"
import { transformCategory, getCategoryName, getCategoryUrl } from "@/lib/sanity/utils"
import Image from "next/image"

// --- TYPES FOR NESTED LINKS ---
interface NavLink {
    name: string;
    href?: string; 
    isDownload?: boolean; 
    children?: NavLink[];
}

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
)

// Custom Pinterest Icon Component
const PinterestIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
    </svg>
)


// --- 1. DOWNLOAD MODAL COMPONENT ---
interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    downloadOptions: NavLink[];
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, downloadOptions }) => {
    // 1. Hook: Tracks client-side mounting for the portal (Unconditional)
    const [mounted, setMounted] = useState(false);

    // 2. Hook: Sets mounted state after initial render (Unconditional)
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // 3. Hook: Manages keydown listener (Unconditional, logic inside is conditional)
    React.useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]); 

    // 4. Conditional return AFTER ALL HOOKS
    if (!isOpen || !mounted) return null;

    // The modal content itself
    const modalContent = (
        // Modal Overlay 
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] transition-opacity duration-300"
            onClick={onClose} 
        >
            {/* Modal Content Box */}
            <div 
                className="bg-white text-black p-8 rounded-lg shadow-2xl w-full max-w-sm mx-4 transform scale-100 transition-transform duration-300 relative"
                onClick={(e) => e.stopPropagation()} 
                role="dialog"
                aria-modal="true"
                aria-labelledby="download-modal-title"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 id="download-modal-title" className="text-xl font-bold mb-6 text-center">Get Your Ebook</h3>

                <div className="space-y-4">
                    {downloadOptions.map((option) => (
                        <Link 
                            key={option.name}
                            href={option.href || "#"}
                            // Download attribute for PDF link
                            {...(option.isDownload ? { download: option.name.replace(/\s/g, '-') } : {})}
                            
                            // Open 'Watch Online' in new tab
                            {...(option.name.includes("Watch Online") ? { target: "_blank", rel: "noopener noreferrer" } : {})}

                            onClick={onClose} 
                            
                            // FINAL STYLES: Gradient, Cream Hover, and Scale Animation
                            className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm 
                                       text-black  
                                       bg-gradient-to-r from-amber-100 to-stone-300 
                                       hover:bg-amber-100 hover:text-black 
                                       transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {option.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    // Use Portal to render outside the Footer's DOM scope
    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
};


// --- 2. FOOTER NAV LINK COMPONENT ---
interface FooterNavLinkProps {
    link: NavLink;
    onModalOpen?: (options: NavLink[]) => void; 
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ link, onModalOpen }) => {
    
    // Renders button that opens modal if children exist
    if (link.children && onModalOpen) {
        return (
            <li>
                <button 
                    onClick={() => onModalOpen(link.children!)}
                    className="flex items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer leading-relaxed w-full justify-start py-0.5"
                    aria-expanded="false" 
                    aria-controls="download-modal"
                >
                    {link.name}
                    <span className="ml-1 text-xs px-1 py-0.5 rounded bg-gray-700 text-gray-300">Action</span> 
                </button>
            </li>
        )
    }

    // Renders standard link
    return (
        <li>
            <Link
                href={link.href || "#"}
                className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed py-0.5 block"
            >
                {link.name}
            </Link>
        </li>
    )
}
// -------------------------------------------------------------------

const Footer = () => {
    const { data: categoriesData, loading: categoriesLoading } = useCategories()
    const [email, setEmail] = useState("")
    
    // --- STATE FOR MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<NavLink[]>([]);

    const openModal = (options: NavLink[]) => {
        setModalOptions(options);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalOptions([]);
    };
    // ----------------------


    // Transform categories for backward compatibility
    const transformedCategories = Array.isArray(categoriesData) ? categoriesData.map(transformCategory) : []

    // --- LINK DATA ---

    const expertiseLinks: NavLink[] = [
        { name: "Human Factors Engineering", href: "/expertise/human-factors" },
        { name: "User Experience & User Interface Design", href: "/expertise/ux-ui" },
        { name: "Industrial Design", href: "/expertise/industrial" },
        { name: "Mechanical Engineering", href: "/expertise/mechanical" },
        { name: "Electronic Engineering", href: "/expertise/electronic" },
        { name: "Embedded Software Development", href: "/expertise/embedded" },
        { name: "Software Development", href: "/expertise/software" },
        { name: "Quality Assurance", href: "/expertise/qa" },
    ]

    const whatWeDoLinks: NavLink[] = [
        { name: "Innovation Strategy", href: "/services/innovation" },
        { name: "Human Factors Engineering", href: "/services/human-factors" },
        { name: "Medical Device Design & Engineering", href: "/services/medical-device" },
        { name: "Medical & Healthcare Software Development", href: "/services/healthcare-software" },
        { name: "Connected Devices (IoT) & Cloud Platforms", href: "/services/iot" },
        { name: "Manufacturing Support and Sourcing", href: "/services/manufacturing" },
        { name: "Quality Assurance & Regulatory Compliance for Medical Devices", href: "/services/compliance" },
    ]

    // --- contentHubLinks (Source for the Downloads modal) ---
    const contentHubLinks: NavLink[] = [
        { name: "Blog", href: "/blog" },
        {
            name: "Downloads & Ebooks",
            children: [
                { name: "Watch Online", href: "/Exsurion Catalog.pdf" },
                { 
                    name: "Download PDF", 
                    href: "/Exsurion Catalog.pdf",
                    isDownload: true 
                }
            ]
        },
    ]


    const aboutLinks: NavLink[] = [
        { name: "About Us", href: "/about" },
        { name: "Culture", href: "/culture" },
        { name: "Team", href: "/team" },
        { name: "Careers", href: "/careers" },
    ]

    const contactLinks: NavLink[] = [
        { name: "Contact Us", href: "/contact" }, // Confirmed route
        { name: "Book Free Consultation", href: "/consultation" },
    ]

    const socialLinks = [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/exsurioninstruments", icon: Linkedin },
        { name: "Facebook", href: "https://www.facebook.com/exsurion.instruments/", icon: Facebook },
        { name: "Instagram", href: "https://www.instagram.com/exsurion.instruments/", icon: Instagram },
        { name: "TikTok", href: "https://www.tiktok.com/@exsurion.instruments", icon: TikTokIcon },
        { name: "Pinterest", href: "https://www.pinterest.com/exsurioninstruments", icon: PinterestIcon },
    ]

    // --- HANDLER FUNCTIONS ---

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        setEmail("")
    }

    // --- RENDER ---

    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Top section with logo and newsletter */}
                <div className="py-12 flex flex-col lg:flex-row justify-center items-center gap-8">
                    {/* Logo and certification */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center space-x-3">
                            <Image src="/exsurion.svg" alt="Logo" width={100} height={100} className='h-16 w-full object-cover' />
                        </div>
                        {/* Certification badge placeholder */}
                    </div>
                </div>

                {/* Main footer content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Expertise */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 ">Expertise</h3>
                        <ul className="space-y-3">
                            {expertiseLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href || "#"}
                                        className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What We Do */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 ">What We Do</h3>
                        <ul className="space-y-3">
                            {whatWeDoLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href || "#"}
                                        className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-base font-semibold mt-8 mb-4 ">Content Hub & Insights</h4>
                        {/* Rendering links, triggering modal for nested items */}
                        <ul className="space-y-3"> 
                            {contentHubLinks.map((link) => (
                                <FooterNavLink 
                                    key={link.name} 
                                    link={link} 
                                    onModalOpen={link.children ? openModal : undefined} 
                                />
                            ))}
                        </ul>
                    </div>

                    {/* We are Exsurion */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 ">We are Exsurion</h3>
                        <ul className="space-y-3">
                            {aboutLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href || "#"} className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-base font-semibold mt-8 mb-4 ">Let's Talk</h4>
                        <ul className="space-y-3">
                            {contactLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href || "#"} className="text-sm text-gray-300 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 ">Categories</h3>
                        {categoriesLoading ? (
                            <ul className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <li key={i}>
                                        <div className="h-4 w-24 bg-gray-700 animate-pulse rounded" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="space-y-3">
                                {transformedCategories.map((category: any) => (
                                    <li key={category.id || category._id}>
                                        <Link
                                            href={getCategoryUrl(category)}
                                            className="text-sm text-gray-300 hover:text-white transition-colors"
                                        >
                                            {getCategoryName(category)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Awards and certifications section */}
                <div className="py-8 border-t border-gray-800">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        {/* Awards placeholders */}
                        <div className="flex items-center gap-8 flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">CLUTCH</span>
                                </div>
                                <div className="text-xs text-gray-400">Top 5 Award</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">GL</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    <div>greenlight guru</div>
                                    <div>TOP 5 Medical Device</div>
                                    <div>Product Design Companies</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">GP</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    <div>GRANDS PRIX</div>
                                    <div>DU DESIGN</div>
                                    <div>Platinum Award</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-black">GF</span>
                                </div>
                                <div className="text-xs font-bold text-white">
                                    <div>   Exsurion</div>
                                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">VERIFIED</div>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">Stay Connected</span>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white-800 hover:text-white hover:bg-stone-500 transition-colors"
                                    >
                                        <social.icon className="w-9 h-9" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>© 2025 Exsurion – All Rights Reserved.</span>
                        <span className="flex items-center gap-1">
                            Made with <span className="text-red-500">❤</span> by Exsurion.
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-6 bg-black dark:bg-white rounded-sm"></div>
                            <span className="text-sm font-semibold">
                                Achieving
                                <br />
                                Together
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 3. THE MODAL IS RENDERED HERE --- */}
            <DownloadModal
                isOpen={isModalOpen}
                onClose={closeModal}
                downloadOptions={modalOptions}
            />
        </footer>
    )
}

export default Footer