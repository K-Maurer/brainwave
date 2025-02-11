
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ViewMilestoneCelebrationProps {
  documentId: string;
}

export function ViewMilestoneCelebration({ documentId }: ViewMilestoneCelebrationProps) {
  const [lastCelebrated, setLastCelebrated] = useState<number | null>(null);

  useEffect(() => {
    const checkMilestones = async () => {
      const { data: milestones, error } = await supabase
        .from('document_milestones')
        .select('views_milestone, celebrated')
        .eq('document_id', documentId)
        .eq('celebrated', false)
        .order('views_milestone', { ascending: true })
        .limit(1);

      if (error) {
        console.error('Error checking milestones:', error);
        return;
      }

      if (milestones && milestones.length > 0) {
        const milestone = milestones[0];
        
        // Prevent celebrating the same milestone twice
        if (lastCelebrated !== milestone.views_milestone) {
          // Launch confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#8b5cf6', '#06b6d4']
          });

          // Show toast notification
          toast({
            title: "🏆 Meilenstein erreicht!",
            description: `Dieses Dokument wurde ${milestone.views_milestone} mal angesehen!`,
            duration: 5000,
          });

          // Update milestone as celebrated
          await supabase
            .from('document_milestones')
            .update({ celebrated: true })
            .eq('document_id', documentId)
            .eq('views_milestone', milestone.views_milestone);

          setLastCelebrated(milestone.views_milestone);
        }
      }
    };

    checkMilestones();
  }, [documentId, lastCelebrated]);

  return null; // This component doesn't render anything visible
}
