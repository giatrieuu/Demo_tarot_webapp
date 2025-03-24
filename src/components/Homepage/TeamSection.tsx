import React from 'react';

// Import all images
import ThaoImg from '/assets/Thảo.jpg';
import TrieuImg from '/assets/Triều.jpg';
import HuyImg from '/assets/Huy.jpg';
import PhongImg from '/assets/Phong.jpg';
import HoangAnhImg from '/assets/Hoàng Anh.jpg';
import HoaImg from '/assets/Hòa.jpg';

interface TeamMember {
    name: string;
    role: string;
    image: string; // This will now reference the imported image
    facebook: string;
}

const TeamSection: React.FC = () => {
    const teamMembers: TeamMember[] = [
        { name: 'Yến Thảo', role: 'FE Dev', image: ThaoImg, facebook: 'https://www.facebook.com/yenthao.phan.7?mibextid=LQQJ4d' },
        { name: 'Gia Triều', role: 'FE Dev', image: TrieuImg, facebook: 'https://www.facebook.com/trieu.gia.9469' },
        { name: 'Quang Huy', role: 'FE Dev - Leader', image: HuyImg, facebook: 'https://www.facebook.com/vilad.huy/' },
        { name: 'Gia Phong', role: 'BE Dev', image: PhongImg, facebook: 'https://www.facebook.com/thus.gios.3' },
        { name: 'Hoàng Anh', role: 'MB Dev', image: HoangAnhImg, facebook: 'https://www.facebook.com/profile.php?id=100010488452873' },
        { name: 'Kiến Hòa', role: 'Designer', image: HoaImg, facebook: 'https://www.facebook.com/hoa.dong.31945243' },
    ];

    return (
        <section className="bg-white py-20 px-16 text-center">
            <h2 className="text-4xl font-serif text-center mb-8">Our Team</h2>
            <div className="relative flex justify-center mb-12">
                <span className="block w-[8%] h-1 bg-gray-300"></span>
                <span className="block w-[8%] h-1 bg-gray-300"></span>
                <span className="block w-[8%] h-1 bg-purple-800"></span>
            </div>
            <div className="flex justify-center items-center flex-wrap">
                {teamMembers.map((member, index) => (
                    <div key={index} className="w-1/6 p-4 transition-transform duration-300 hover:scale-105">
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                            <img
                                src={member.image}
                                alt="Team member"
                                className="w-24 h-24 object-cover rounded-full mb-2"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </a>
                        <h3 className="text-lg font-semibold text-[#4a044e]">{member.name}</h3>
                        <p className="text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;