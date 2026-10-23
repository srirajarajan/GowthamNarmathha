export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

const sharePayload = {
  title: "Gowtham & Narmathha — Wedding Reception",
  text: "Together with our families, we invite you to celebrate the wedding reception of Gowtham & Narmathha on Thursday, 19 November 2026 at Sri Adithya Mahal, Salem.",
};

export async function shareInvitation(): Promise<ShareResult> {
  const url = typeof window === "undefined" ? "" : window.location.href;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ ...sharePayload, url });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
      // Fall through to copying the link.
    }
  }

  const copyText = `${sharePayload.text}\n${url}`;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(copyText);
      return "copied";
    }
  } catch {
    // Fall through to the legacy copy approach.
  }

  try {
    const field = document.createElement("textarea");
    field.value = copyText;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const success = document.execCommand("copy");
    document.body.removeChild(field);
    return success ? "copied" : "failed";
  } catch {
    return "failed";
  }
}
