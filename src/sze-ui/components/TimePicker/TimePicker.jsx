import React from 'react';

const TimePicker = ({
  value = null,
  onChange = null,
  format = '24h', // '24h' or '12h'
  showSeconds = false,
  className = '',
  placeholder = 'Válassz időt',
}) => {
  const [open, setOpen] = React.useState(false);
  const [hours, setHours] = React.useState('00');
  const [minutes, setMinutes] = React.useState('00');
  const [seconds, setSeconds] = React.useState('00');
  const [period, setPeriod] = React.useState('AM');

  React.useEffect(() => {
    if (value) {
      const [h, m, s] = value.split(':');
      setHours(h || '00');
      setMinutes(m || '00');
      setSeconds(s || '00');

      if (format === '12h') {
        const hNum = parseInt(h);
        setPeriod(hNum >= 12 ? 'PM' : 'AM');
      }
    }
  }, [value, format]);

  const handleTimeChange = () => {
    let finalHours = hours;
    if (format === '12h') {
      let h = parseInt(hours);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      finalHours = String(h).padStart(2, '0');
    }

    const timeString = showSeconds
      ? `${finalHours}:${minutes}:${seconds}`
      : `${finalHours}:${minutes}`;

    if (onChange) {
      onChange(timeString);
    }
    setOpen(false);
  };

  const displayHours = format === '12h' ? (parseInt(hours) % 12 || 12) : hours;

  return (
    <div className={`w-full ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-3 bg-white border-2 border-sze-primary-200 rounded-xl hover:border-sze-primary-400 transition-all duration-200 flex items-center justify-between text-left"
        >
          <span className="text-gray-700 font-medium">
            {value ? (
              <>
                <span className="text-sze-primary font-bold text-lg">{displayHours}</span>
                <span className="text-gray-400 mx-1">:</span>
                <span className="text-sze-primary font-bold text-lg">{minutes}</span>
                {showSeconds && (
                  <>
                    <span className="text-gray-400 mx-1">:</span>
                    <span className="text-sze-primary font-bold text-lg">{seconds}</span>
                  </>
                )}
                {format === '12h' && (
                  <span className="text-sze-secondary font-semibold ml-2 text-sm">{period}</span>
                )}
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          <i className={`pi pi-clock transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Panel */}
        {open && (
          <div className="absolute top-full left-0 mt-2 bg-white border-2 border-sze-primary-200 rounded-xl shadow-xl p-3 z-50 animate-fadeIn w-max">
            {/* Time Display */}
            <div className="bg-gradient-to-br from-sze-primary-50 to-sze-secondary-50 rounded-lg p-3 mb-3 text-center border border-sze-primary-200">
              <div className="text-2xl font-bold text-sze-primary tracking-wider">
                {displayHours}
                <span className="text-sze-secondary animate-pulse">:</span>
                {minutes}
                {showSeconds && (
                  <>
                    <span className="text-sze-secondary animate-pulse">:</span>
                    {seconds}
                  </>
                )}
              </div>
              {format === '12h' && (
                <div className="mt-2 text-xs text-sze-secondary font-semibold">{period}</div>
              )}
            </div>

            {/* Selectors Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {/* Hours */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                  Óra
                </label>
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      const h = (parseInt(hours) + 1) % (format === '24h' ? 24 : 12);
                      setHours(String(h || (format === '12h' ? 12 : 0)).padStart(2, '0'));
                    }}
                    className="w-full p-1 rounded-md hover:bg-sze-primary-100 transition-colors duration-200"
                  >
                    <i className="pi pi-chevron-up text-sze-primary text-sm font-bold" />
                  </button>
                  <input
                    type="number"
                    min={format === '24h' ? 0 : 1}
                    max={format === '24h' ? 23 : 12}
                    value={displayHours}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      if (format === '12h') {
                        if (val < 1) val = 12;
                        if (val > 12) val = 12;
                      } else {
                        if (val < 0) val = 0;
                        if (val > 23) val = 23;
                      }
                      setHours(String(val).padStart(2, '0'));
                    }}
                    className="w-full px-2 py-1 text-center text-base font-bold text-sze-primary border-2 border-sze-primary-200 rounded-md focus:border-sze-primary focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const maxHour = format === '24h' ? 23 : 12;
                      const h = parseInt(hours) === 0 ? maxHour : parseInt(hours) - 1;
                      setHours(String(h || maxHour).padStart(2, '0'));
                    }}
                    className="w-full p-1 rounded-md hover:bg-sze-primary-100 transition-colors duration-200"
                  >
                    <i className="pi pi-chevron-down text-sze-primary text-sm font-bold" />
                  </button>
                </div>
              </div>

              {/* Minutes */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                  Perc
                </label>
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      const m = (parseInt(minutes) + 1) % 60;
                      setMinutes(String(m).padStart(2, '0'));
                    }}
                    className="w-full p-1 rounded-md hover:bg-sze-secondary-100 transition-colors duration-200"
                  >
                    <i className="pi pi-chevron-up text-sze-secondary text-sm font-bold" />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 59) val = 59;
                      setMinutes(String(val).padStart(2, '0'));
                    }}
                    className="w-full px-2 py-1 text-center text-base font-bold text-sze-secondary border-2 border-sze-secondary-200 rounded-md focus:border-sze-secondary focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const m = parseInt(minutes) === 0 ? 59 : parseInt(minutes) - 1;
                      setMinutes(String(m).padStart(2, '0'));
                    }}
                    className="w-full p-1 rounded-md hover:bg-sze-secondary-100 transition-colors duration-200"
                  >
                    <i className="pi pi-chevron-down text-sze-secondary text-sm font-bold" />
                  </button>
                </div>
              </div>

              {/* Seconds */}
              {showSeconds && (
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">
                    Másod
                  </label>
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        const s = (parseInt(seconds) + 1) % 60;
                        setSeconds(String(s).padStart(2, '0'));
                      }}
                      className="w-full p-1 rounded-md hover:bg-green-100 transition-colors duration-200"
                    >
                      <i className="pi pi-chevron-up text-green-600 text-sm font-bold" />
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => {
                        let val = parseInt(e.target.value);
                        if (val < 0) val = 0;
                        if (val > 59) val = 59;
                        setSeconds(String(val).padStart(2, '0'));
                      }}
                      className="w-full px-2 py-1 text-center text-base font-bold text-green-600 border-2 border-green-300 rounded-md focus:border-green-500 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const s = parseInt(seconds) === 0 ? 59 : parseInt(seconds) - 1;
                        setSeconds(String(s).padStart(2, '0'));
                      }}
                      className="w-full p-1 rounded-md hover:bg-green-100 transition-colors duration-200"
                    >
                      <i className="pi pi-chevron-down text-green-600 text-sm font-bold" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Period Toggle (12h format) */}
            {format === '12h' && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setPeriod('AM')}
                  className={`flex-1 py-1 text-sm rounded-md font-semibold transition-all duration-200 ${
                    period === 'AM'
                      ? 'bg-sze-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod('PM')}
                  className={`flex-1 py-1 text-sm rounded-md font-semibold transition-all duration-200 ${
                    period === 'PM'
                      ? 'bg-sze-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  PM
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setHours('00');
                  setMinutes('00');
                  setSeconds('00');
                }}
                className="flex-1 py-1.5 px-3 border-2 border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Mégse
              </button>
              <button
                onClick={handleTimeChange}
                className="flex-1 py-1.5 px-3 bg-gradient-to-r from-sze-primary to-sze-primary-700 text-white text-sm rounded-md hover:shadow-lg transition-all duration-200 font-medium"
              >
                Oki
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default TimePicker;
