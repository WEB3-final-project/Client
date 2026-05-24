export function isLive(
  start,
  end
) {
  const now = new Date();

  return (
    now >= new Date(start) &&
    now <= new Date(end)
  );
}