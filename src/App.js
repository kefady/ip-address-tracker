import React from "react"
import { useState, useEffect } from "react"
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from "react-leaflet"
import LocationMarker from "./components/LocationMarker"
import buttonImg from "./images/icon-arrow.svg"

function App() {
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState('')

  const getAddress = async () => {
    const value = ValidateIPaddress(ipAddress)
    var ip = ipAddress;
    if (value === 'domain') {
      await fetch(`https://dns.google/resolve?name=${ipAddress}`)
      .then((response) => response.json())
      .then((data) => ip = data.Answer[0].data)
    }
    if (value !== 'error') {
      await fetch(`https://ipwho.is/${ip}`)
        .then((response) => response.json())
        .then((data) => setAddress(data));
    }
    setIpAddress('')
  }

  const enterEvent = event => {
    if (event.keyCode === 13) {
      getAddress()
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress) || ipaddress === "") {
      return ('ip')
    }
    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(ipaddress)) {
      return ('domain')
    }
    alert("You have entered an invalid IP address!")
    return ('error')
  }

  return (
    <>
      <div className="flex flex-col h-screen max-h-screen">
        <div className="flex justify-center relative z-50 bg-bgpattern bg-cover px-12 pt-8 pb-32">
          <div className="w-full max-w-screen-md">
            <h1 className="text-white text-4xl text-center font-medium pb-4">IP Address Tracker</h1>
            <div className="flex">
              <input className="flex-1 px-4 py-4 text-xl rounded-l-2xl focus:outline-none"
                type="text" placeholder="Search for any IP address or domain"
                value={ipAddress}
                onChange={event => setIpAddress(event.target.value)}
                onKeyDown={enterEvent}
              />
              <button className="bg-black px-6 py-4 rounded-r-2xl focus:outline-none hover:bg-slate-700 ease-in-out duration-300"
                type="submit"
                onClick={getAddress}
              >
                <img src={buttonImg} alt="" />
              </button>
            </div>
          </div>

          {address && (
            <div className="absolute grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -bottom-80 sm:-bottom-72 md:-bottom-36 lg:-bottom-20 text-center md:text-left bg-white rounded-2xl shadow-lg max-w-5xl gap-x-8 gap-y-6 px-8 pt-8 pb-6">
              <div className="flex flex-col md:border-r-2 border-zinc-500 pr-4">
                <h2 className="uppercase text-md text-zinc-500 font-bold tracking-wider mb-2">ip address</h2>
                <span className="text-2xl font-medium">{address.ip}</span>
              </div>
              <div className="flex flex-col lg:border-r-2 border-zinc-500 pr-4">
                <h2 className="uppercase text-md text-zinc-500 font-bold tracking-wider mb-2">location</h2>
                <span className="text-2xl font-medium">{address.city}, {address.region}</span>
              </div>
              <div className="flex flex-col md:border-r-2 border-zinc-500 pr-4">
                <h2 className="uppercase text-md text-zinc-500 font-bold tracking-wider mb-2">timezone</h2>
                <span className="text-2xl font-medium">UTC {address.timezone.utc}</span>
              </div>
              <div className="flex flex-col pr-4">
                <h2 className="uppercase text-md text-zinc-500 font-bold tracking-wider mb-2">isp</h2>
                <span className="text-2xl font-medium">{address.connection.isp}</span>
              </div>
            </div>
          )}
        </div>

        {address && (
          <div className="z-10">
            <MapContainer center={[address.latitude, address.longitude]} zoom={15} scrollWheelZoom={true} style={{ width: '100vw', height: '100vh' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'>
              </TileLayer>
              <LocationMarker address={address} />
            </MapContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default App;