import classNames from 'classnames';

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={className}>
            <div className="w-8 h-8 relative bg-gray-400 rounded-full animate-spin">
                <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full"> </div>
            </div>
        </div>
    );
}
