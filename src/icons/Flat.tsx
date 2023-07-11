export default function FlatIcon({
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
      viewBox="0 0 384.12 452.9601"
      className="w-auto"
    >
      <path
        className={fill}
        d="M337.06,0H47.07A47.2066,47.2066,0,0,0,0,47.07V405.9a47.2043,47.2043,0,0,0,47.07,47.06H337.06a47.2022,47.2022,0,0,0,47.06-47.06V47.07A47.2045,47.2045,0,0,0,337.06,0Zm14.9714,398.2028a16.9754,16.9754,0,0,1-16.9257,16.9257H49.0046a16.9755,16.9755,0,0,1-16.9258-16.9257V54.7656A16.9755,16.9755,0,0,1,49.0046,37.84H335.1057a16.9755,16.9755,0,0,1,16.9257,16.9258Z"
      />
      <path
        className={fill}
        d="M192.5625,330.9617q30.9906,0,61.9814.0107c10.2081.0177,17.43,6.6223,17.4935,15.8651.0642,9.2705-7.145,16.0906-17.2576,16.0994q-62.731.055-125.4624,0c-10.0955-.0091-17.3128-6.8591-17.2346-16.1268.0783-9.28,7.2425-15.82,17.4986-15.8374Q161.0718,330.9188,192.5625,330.9617Z"
      />
      <path
        className={fill}
        d="M192.5576,210.4829q30.9907,0,61.9814.0107c10.2081.0177,17.43,6.6223,17.4935,15.8651.0643,9.27-7.145,16.0906-17.2576,16.1q-62.7311.0549-125.4624,0c-10.0955-.0091-17.3128-6.859-17.2346-16.1268.0783-9.28,7.2426-15.82,17.4986-15.8374Q161.0669,210.44,192.5576,210.4829Z"
      />
      <path
        className={fill}
        d="M192.5576,90.0041q30.9907,0,61.9814.0107c10.2081.0177,17.43,6.6223,17.4935,15.8651.0643,9.27-7.145,16.0906-17.2576,16.0995q-62.7311.0549-125.4624,0C119.217,121.97,112,115.12,112.0779,105.8522c.0783-9.28,7.2426-15.82,17.4986-15.8374Q161.0669,89.9614,192.5576,90.0041Z"
      />
    </svg>
  );
}
