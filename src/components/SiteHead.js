import React, { useEffect, useState } from 'react';
import logo from '../images/BA-transp.png';

const SiteHead = () => {
  const [matrixValues, setMatrixValues] = useState({
    lastValue: -80,
    thirdValue: 1,
    seventhValue: 4,
    eighthValue: -1,
    tenthValue: -1,
    twelfthValue: -84,
    thirteenthValue: 117,
    fifteenthValue: 1,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMatrixValues((prevValues) => {
        let {
          lastValue,
          thirdValue,
          seventhValue,
          eighthValue,
          tenthValue,
          twelfthValue,
          thirteenthValue,
          fifteenthValue,
        } = prevValues;

        if (lastValue >= 80) {
          clearInterval(intervalId);
          return {
            lastValue: 1,
            thirdValue: 0,
            seventhValue: 0,
            eighthValue: 0,
            tenthValue: 0,
            twelfthValue: 0,
            thirteenthValue: 0,
            fifteenthValue: 0,
          };
        }

        lastValue += 1;

        if (lastValue >= 50) {
          // Start normalizing other values
          thirdValue = thirdValue - 0.2;
          seventhValue = seventhValue - 0.5;
          eighthValue = eighthValue + 0.2;
          tenthValue = tenthValue + 0.2;
          twelfthValue = twelfthValue + 14.4;
          thirteenthValue = thirteenthValue - 14.7;
          fifteenthValue = fifteenthValue - 0.4;
        }

        return {
          lastValue,
          thirdValue,
          seventhValue,
          eighthValue,
          tenthValue,
          twelfthValue,
          thirteenthValue,
          fifteenthValue,
        };
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const {
    lastValue,
    thirdValue,
    seventhValue,
    eighthValue,
    tenthValue,
    twelfthValue,
    thirteenthValue,
    fifteenthValue,
  } = matrixValues;

  const logoStyle = {
    transform: `matrix3d(1, 0, ${thirdValue.toFixed(
      1,
    )}, 0, 0, 1, ${seventhValue.toFixed(1)}, ${eighthValue.toFixed(
      1,
    )}, 0, ${tenthValue.toFixed(1)}, 1, 0, ${twelfthValue.toFixed(
      1,
    )}, ${thirteenthValue.toFixed(1)}, ${fifteenthValue.toFixed(
      1,
    )}, ${lastValue})`,
  };

  return (
    <div className="header">
      <img
        className="title-img"
        src={logo}
        width="350"
        alt="plane flying over logo"
        style={logoStyle}
      />
    </div>
  );
};

export default SiteHead;
