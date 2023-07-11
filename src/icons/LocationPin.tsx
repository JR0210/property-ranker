export default function LocationPinIcon({
  fill,
  size,
}: {
  fill: string;
  size: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 277.3489 384.1636"
      className="w-auto"
    >
      <path
        className={fill}
        d="M135.5868,0c82.8641-.1652,147.1951,68.5,141.3991,148.3881-2.33,32.11-14.9381,61.1738-29.5674,89.308-26.5949,51.146-60.7726,97.0419-98.2123,140.6164-6.1991,7.2148-14.2982,7.9091-20.0209,1.2341C84.0152,326.86,42.8209,271.4815,15.5561,206.9975,1.453,173.6425-4.9972,139.4482,4.4713,103.2776,18.297,50.4617,64.9106,8.637,119.1439,1.54,125.5644.7,132.0455.3245,135.5868,0Zm3.0565,209.0568a70.002,70.002,0,0,0,.1336-140.0024c-38.4284-.177-70.0346,31.5179-69.9251,70.1215C68.9611,177.7284,100.2929,209.1,138.6433,209.0571Z"
      />
    </svg>
  );
}
