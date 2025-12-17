import React, { forwardRef, useState, useEffect } from "react";

// Icon component that dynamically imports from lucide-react
// This enables tree-shaking to only import the icons that are actually used
const Icon = forwardRef(
  ({ name, size = 24, className = "", ...props }, ref) => {
    const [IconComponent, setIconComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;

      const loadIcon = async () => {
        setIsLoading(true);
        setError(null);

        try {
          // Dynamic import to enable tree-shaking
          const lucideModule = await import("lucide-react");

          // Check if the icon exists in the module
          if (!lucideModule[name]) {
            throw new Error(`Icon "${name}" not found in lucide-react`);
          }

          if (isMounted) {
            setIconComponent(lucideModule[name]);
            setIsLoading(false);
          }
        } catch (err) {
          console.error(`Error loading icon "${name}":`, err);
          if (isMounted) {
            setError(err);
            setIsLoading(false);
          }
        }
      };

      if (name) {
        loadIcon();
      }

      return () => {
        isMounted = false;
      };
    }, [name]);

    // Default styling for consistency
    const defaultClassName = "icon-component";
    const combinedClassName = `${defaultClassName} ${className}`.trim();

    // Accessibility attributes
    const accessibilityProps = {
      "aria-hidden": true,
      focusable: false,
      role: "img",
      ...props,
    };

    // Show loading state
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={`${combinedClassName} icon-loading`}
          style={{
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "currentColor",
          }}
          {...accessibilityProps}
        >
          <div
            style={{
              width: "60%",
              height: "60%",
              backgroundColor: "currentColor",
              opacity: 0.3,
              borderRadius: "2px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      );
    }

    // Show error state
    if (error || !IconComponent) {
      return (
        <div
          ref={ref}
          className={`${combinedClassName} icon-error`}
          style={{
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "currentColor",
          }}
          {...accessibilityProps}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: Math.max(12, size * 0.6),
              fontWeight: "bold",
              opacity: 0.5,
            }}
          >
            ?
          </div>
        </div>
      );
    }

    // Render the icon
    return (
      <IconComponent
        ref={ref}
        size={size}
        className={combinedClassName}
        {...accessibilityProps}
      />
    );
  },
);

// Set display name for debugging
Icon.displayName = "Icon";

export default Icon;

// Add some basic CSS styles
const iconStyles = `
  .icon-component {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }

  .icon-loading {
    opacity: 0.7;
  }

  .icon-error {
    opacity: 0.5;
  }
`;

// Export styles if needed (can be imported in your main CSS file)
export { iconStyles };
