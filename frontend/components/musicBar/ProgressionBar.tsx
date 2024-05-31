import React from 'react';

interface ProgressionBarProps {
        maxTime: number;
}

const ProgressionBar: React.FC<ProgressionBarProps> = ({ maxTime }) => {
    return (
        <div className="progression-bar">
            <div
                className="progression-bar__progress"
                style={{ width: maxTime + '%' }}
            ></div>
        </div>
    );
};

export default ProgressionBar;
