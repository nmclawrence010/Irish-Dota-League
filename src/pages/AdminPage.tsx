import React from "react";
import { Navigate } from "react-router-dom";
import { useAllTeams } from "../hooks/useAllTeams";
import { useAuth } from "../hooks/useAuth";
import { Download } from "lucide-react";
import JSZip from "jszip";

export const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { teams, loading, error } = useAllTeams();

  const downloadImage = async (imageUrl: string, teamName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract file extension from URL
      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1]?.split('?')[0] || 'png';
      
      // Set filename with team name and extension
      const sanitizedTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `${sanitizedTeamName}_logo.${extension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const downloadAllImages = async () => {
    try {
      const zip = new JSZip();
      const teamsWithImages = teams.filter(team => team.image_url);
      
      if (teamsWithImages.length === 0) {
        alert('No team logos available to download.');
        return;
      }

      // Download all images and add to zip
      const downloadPromises = teamsWithImages.map(async (team) => {
        try {
          const response = await fetch(team.image_url!);
          const blob = await response.blob();
          
          // Extract file extension from URL
          const urlParts = team.image_url!.split('.');
          const extension = urlParts[urlParts.length - 1]?.split('?')[0] || 'png';
          
          // Sanitize team name for filename
          const sanitizedTeamName = team.name.replace(/[^a-zA-Z0-9]/g, '_');
          const filename = `${sanitizedTeamName}_logo.${extension}`;
          
          zip.file(filename, blob);
        } catch (error) {
          console.error(`Error downloading ${team.name} logo:`, error);
        }
      });

      await Promise.all(downloadPromises);
      
      // Generate and download zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'all_team_logos.zip';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading all images:', error);
      alert('Failed to download all team logos. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        Error loading teams: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
             <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold text-idl-light">Admin Dashboard</h1>
         <div className="flex items-center gap-3">
           <span className="px-3 py-1 text-sm rounded-full bg-idl-accent text-white">
             {teams.length} Teams
           </span>
           <button
             onClick={downloadAllImages}
             className="flex items-center gap-2 px-4 py-2 bg-idl-accent text-white rounded-lg hover:bg-idl-accent/80 transition-colors text-sm font-medium"
             title="Download all team logos"
           >
             <Download size={16} />
             Download All
           </button>
         </div>
       </div>

      {loading ? (
        <div className="text-center text-idl-light py-8">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="text-center text-idl-light py-8">
          No teams registered yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {teams.map((team) => (
                         <div
               key={team.id}
               className="bg-idl-gray rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105 border border-idl-dark relative"
             >
               {/* Download Button - Top Right */}
               {team.image_url && (
                 <button
                   onClick={() => downloadImage(team.image_url!, team.name)}
                   className="absolute top-2 right-2 p-1 text-idl-accent hover:text-idl-light transition-colors bg-idl-gray/80 rounded-full"
                   title="Download team logo"
                 >
                   <Download size={20} />
                 </button>
               )}
               
               <div className="text-center space-y-4">
                {/* Team Logo */}
                 <div className="flex justify-center">
                   {team.image_url ? (
                     <img
                       src={team.image_url}
                       alt={`${team.name} logo`}
                       className="w-32 h-32 object-cover rounded-xl border-4 border-idl-accent shadow-lg"
                       onError={(e) => {
                         // Hide the image if it fails to load
                         e.currentTarget.style.display = 'none';
                       }}
                     />
                   ) : (
                     <div className="w-32 h-32 bg-idl-dark rounded-xl border-4 border-idl-accent flex items-center justify-center shadow-lg">
                       <span className="text-3xl text-idl-light font-bold">
                         {team.name.charAt(0).toUpperCase()}
                       </span>
                     </div>
                   )}
                 </div>

                {/* Team Name */}
                 <div>
                   <h2 className="text-lg font-bold text-idl-light truncate" title={team.name}>
                     {team.name}
                   </h2>
                   <p className="text-sm text-idl-accent">Division {team.division_id}</p>
                 </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}; 