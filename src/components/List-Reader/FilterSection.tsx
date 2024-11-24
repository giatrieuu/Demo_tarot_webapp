import React from 'react';
import { Checkbox, Slider, Button, Skeleton } from 'antd';

interface FilterSectionProps {
    selectedTopicIds: string[];
    priceRange: [number, number];
    topics: { id: string; name: string }[];
    loading: boolean; // Thêm trạng thái loading
    onTopicChange: (values: string[]) => void;
    onPriceChange: (values: [number, number]) => void;
    onReset: () => void;
    onApply: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    selectedTopicIds,
    priceRange,
    topics,
    loading,
    onTopicChange,
    onPriceChange,
    onReset,
    onApply,
}) => {
    return (
        <div className="w-1/4 bg-[#d9e6dc] p-6 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter</h2>
                <Button type="link" onClick={onReset}>
                    Reset all
                </Button>
            </div>

            {/* Topic Filter */}
            <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Topic</h3>
                {loading ? (
                    <Skeleton active title={false} paragraph={{ rows: 4 }} />
                ) : (
                    <Checkbox.Group value={selectedTopicIds} onChange={(values) => onTopicChange(values as string[])}>
                        {topics.map((topic) => (
                            <Checkbox key={topic.id} value={topic.id}>
                                {topic.name}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                )}
            </div>

            {/* Price Filter */}
            <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Price</h3>
                {loading ? (
                    <Skeleton.Input active style={{ width: '100%' }} />
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-4 space-x-2">
                            {/* Display "From" */}
                            <div className="w-1/2 p-2 text-center bg-gray-100 rounded-md border border-gray-300">
                                {priceRange[0].toLocaleString()} VND
                            </div>
                            {/* Display "To" */}
                            <div className="w-1/2 p-2 text-center bg-gray-100 rounded-md border border-gray-300">
                                {priceRange[1].toLocaleString()} VND
                            </div>
                        </div>
                        {/* Slider */}
                        <Slider
                            range
                            min={0}
                            max={900000}
                            step={1000}
                            value={priceRange}
                            onChange={(values) => onPriceChange(values as [number, number])}
                            tooltip={{
                                formatter: (value) => `${value} VND`,
                            }}
                        />
                    </>
                )}
            </div>

            {/* Apply Button */}
            <Button type="primary" className="w-full" onClick={onApply} disabled={loading}>
                Apply
            </Button>
        </div>
    );
};

export default FilterSection;
