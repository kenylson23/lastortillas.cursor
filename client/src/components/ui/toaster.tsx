import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(function ({ id, title, description, variant }) {
        return (
          <div 
            key={id}
            className={`
              max-w-sm w-full px-4 py-3 rounded-lg shadow-lg transition-all duration-300
              ${variant === 'success' ? 'bg-green-500 text-white' : 
                variant === 'destructive' ? 'bg-red-500 text-white' : 
                'bg-gray-800 text-white'}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm">{title}</div>
                {description && (
                  <div className="text-xs mt-1 opacity-90">{description}</div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
