export const dynamicParams = false //id：3 404

export const generateStaticParams = async () => {
    return [
        { id: '1' },
        { id: '2' },
        // 可以根据需要添加更多的路径
    ];
};


export default async function Article({ params }: { params: { id: string } }) {
  return <div>{params.id}-----作品页面</div>;
}