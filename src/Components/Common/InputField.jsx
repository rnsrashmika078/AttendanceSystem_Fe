
function InputField({
  span,
  htmlFor,
  label,
  description,
  placeholder,
  type,
  name,
  id,
  handleOnChange
  
}) {

  // const handleOnChange = (e) => {
  //   let val = e.target.value;
  //   let name = e.target.name;
  //   setLocalvalue(e.target.val)
  //   handleonChangeData(name, val,value);
  // };

  // const handleClick = () => {
  //   setLocalvalue("");
  // };
 

  return (
    <div className={`sm:col-span-${span}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            {description}
          </div>
          <input
            id={id}
            name={name}
            onChange={handleOnChange}
            type={type}
            placeholder={placeholder}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
}

export default InputField;
