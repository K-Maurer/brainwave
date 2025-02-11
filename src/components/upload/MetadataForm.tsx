
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MetadataFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
  learningType: string;
  setLearningType: (value: string) => void;
  difficultyLevel: string;
  setDifficultyLevel: (value: string) => void;
}

export function MetadataForm({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  setTags,
  learningType,
  setLearningType,
  difficultyLevel,
  setDifficultyLevel,
}: MetadataFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titel der Unterlagen*</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z.B. Mathe Kapitel 1" 
          className="bg-white/50 dark:bg-slate-800/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategorie</Label>
        <Input 
          id="category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="z.B. Mathematik" 
          className="bg-white/50 dark:bg-slate-800/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Input 
          id="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kurze Beschreibung der Unterlagen" 
          className="bg-white/50 dark:bg-slate-800/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (mit Komma getrennt)</Label>
        <Input 
          id="tags" 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="z.B. algebra, gleichungen, basics" 
          className="bg-white/50 dark:bg-slate-800/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningType">Lerntyp</Label>
        <Input 
          id="learningType" 
          value={learningType}
          onChange={(e) => setLearningType(e.target.value)}
          placeholder="z.B. Übungsaufgaben" 
          className="bg-white/50 dark:bg-slate-800/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficultyLevel">Schwierigkeitsgrad</Label>
        <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
          <SelectTrigger className="bg-white/50 dark:bg-slate-800/50">
            <SelectValue placeholder="Wählen Sie einen Schwierigkeitsgrad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Anfänger</SelectItem>
            <SelectItem value="intermediate">Fortgeschritten</SelectItem>
            <SelectItem value="advanced">Experte</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
