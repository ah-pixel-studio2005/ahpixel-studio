"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { trackStudioEvent, type StudioEventName } from "../lib/events";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; eventName: StudioEventName; eventDetail?: Record<string, unknown>; children: ReactNode };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(function TrackedLink({ href, eventName, eventDetail, children, ...props }, ref) {
  return <a {...props} href={href} ref={ref} onClick={(event) => { trackStudioEvent(eventName, eventDetail); props.onClick?.(event); }}>{children}</a>;
});
